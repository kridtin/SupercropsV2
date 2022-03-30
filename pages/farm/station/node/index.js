import { React, useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  Container,
  Button,
  styled,
  Divider,
  Typography,
  CardActionArea,
  alpha,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  IconButton,
  MenuItem,
  Menu,
  useTheme
} from '@mui/material';

import Slider from '@mui/material/Slider';
import { Grid } from '@mui/material';
import Head from 'next/head';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HouseIcon from '@mui/icons-material/House';
import CabinIcon from '@mui/icons-material/Cabin';
import Text from 'src/components/Text';
import { Authenticated } from 'src/components/Authenticated';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import Link from 'src/components/Link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { useTranslation } from 'react-i18next';
import { style } from '@mui/system';
import Nodeinfo from '../../../../src/content/node/Nodeinfo';
import SensorBox from '../../../../src/content/node/SensorBox';
import Garph from '../../../../src/content/node/Garph';
import RelayComponent from '../../../../src/content/node/RelayComponent';
import client from '../../../api/mqtt';
import { getTHsensor } from '../../../../assets/getTHsensor';
import { sensoricon } from '../../../../assets/sensoricon';
import { isDatakeys } from '../../../../assets/isDatakeys';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Block1 from '../../../../src/content/Blocks/SparklinesLarge/Block1';

import styles from '../../../../styles/node.module.scss';

import NodeMenu from '../../../../src/components/NodeMenu';

function Node() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const actionRef1 = useRef(null);

  const [reTime, setreTime] = useState(300000);
  const [nodeInfo, setnodeInfo] = useState({});
  const [zoneIDlist, setzoneIDlist] = useState([]);
  const [relayIDlist, setrelayIDlist] = useState([]);
  const [relayList, setrelayList] = useState([]);
  const [zoneList, setzoneList] = useState([]);
  const [zoneContent, setzoneContent] = useState([]);
  const [dataList, setdataList] = useState([]);
  const [success, setsuccess] = useState(false);
  const [wait, setwait] = useState(false);
  const [fail, setfail] = useState(false);
  const [infoBox, setinfoBox] = useState(false);

  const [dataSelect, setdataSelect] = useState(null);

  const [graphDataList, setgarphDataList] = useState([]);

  const [graph, setgraph] = useState(true);
  const [failTxt, setfailTxt] = useState('เกิดข้อผิดพลาดบางอย่าง');

  async function reloadData() {
    console.log('reloading'); /*
    if (
      localStorage.getItem('_login') == false ||
      localStorage.getItem('_login') == null ||
      localStorage.getItem('_login') == 'null' ||
      localStorage.getItem('_login') == '' ||
      localStorage.getItem('_orgID') == null ||
      localStorage.getItem('_orgID') == 'null' ||
      localStorage.getItem('_orgID') == ''
    ) {
      window.location.assign('/login');
    }*/
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _nodeID = 'N1f8003e446ef4e6eaacb06551796f412'; //localStorage.getItem('_nodeID');
    const nodeInfo = await axios
      .post(`http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`, {
        orgId: _orgID
      })
      .catch((error) => {
        /*
        localStorage.clear();
        window.location.assign("/login");*/
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    const nodeInfores = nodeInfo.data;
    console.log(nodeInfores);
    getRefreshTime(nodeInfores.refreshTime);

    setnodeInfo(nodeInfores);
    setzoneIDlist(nodeInfores.zoneIDlist);
    setrelayIDlist(nodeInfores.relayIDlist);
    let z_list = [];
    let z_cont = [];
    for (let j = 0; j < nodeInfores.zoneIDlist.length; j++) {
      const zoneID = nodeInfores.zoneIDlist[j];
      const zoneres = await axios
        .post(`http://203.151.136.127:10001/api/${_farmID}/data`, {
          orgId: _orgID,
          zoneId: zoneID
        })
        .catch((error) => {
          /*
          localStorage.clear();
          window.location.assign("/login");*/

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
      const _zdata = [];
      for (var key in zoneres.data[0]) {
        if (zoneres.data[0].hasOwnProperty(key)) {
          _zdata.push([key, zoneres.data[0][key]]);
        }
      }
      z_list.push(_zdata);
      z_cont.push(false);
    }
    setzoneContent(z_cont);
    setzoneList(z_list);
    var datalist = z_list;
    //console.log(z_list);

    setdataList(datalist);
    let r_list = [];
    for (let i = 0; i < nodeInfores.relayIDlist.length; i++) {
      const relayID = nodeInfores.relayIDlist[i];
      const relay = await axios.post(
        `http://203.151.136.127:10001/api/${_farmID}/relay`,
        {
          orgId: _orgID,
          relayId: relayID
        }
      );

      // set ค่า timefunction และ datafunction ด้วยตัวเอง
      //relay.data.dataFunction = true;
      //relay.data.timeFunction = true;
      //=========================================
      r_list.push(relay.data);
    }
    setrelayList(r_list);
    setdataSelect(null);
    console.log(r_list);
  }

  //=======================================//
  //=============Supsciption===============//
  //=======================================//
  useEffect(async () => {
    reloadData();
  }, []);

  //=======================================//
  // ON Recive message from device //
  //=======================================//

  function getRefreshTime(time) {
    if (time == '5m') {
      setreTime(300000);
      console.log('set refresh time to => 300000');
      //document.getElementById('refreshTime').value = 300000;
    } else if (time == '10m') {
      setreTime(600000);
      console.log('set refresh time to => 600000');
      //document.getElementById('refreshTime').value = 600000;
    } else if (time == '15m') {
      setreTime(900000);
      console.log('set refresh time to => 900000');
      //document.getElementById('refreshTime').value = 900000;
    } else if (time == '20m') {
      setreTime(1200000);
      console.log('set refresh time to => 1200000');
      //document.getElementById('refreshTime').value = 1200000;
    } else if (time == '25m') {
      setreTime(1500000);
      console.log('set refresh time to => 1500000');
      //document.getElementById('refreshTime').value = 1500000;
    } else if (time == '30m') {
      setreTime(1800000);
      console.log('set refresh time to => 1800000');
      //document.getElementById('refreshTime').value = 1800000;
    } else if (time == '1h') {
      setreTime(3600000);
      console.log('set refresh time to => 3600000');
      //document.getElementById('refreshTime').value = 1800000;
    } else if (time == '2h') {
      setreTime(7200000);
      console.log('set refresh time to => 7200000');
      //document.getElementById('refreshTime').value = 1800000;
    } else if (time == '30s') {
      setreTime(30000);
      console.log('set refresh time to => 7200000');
      //document.getElementById('refreshTime').value = 1800000;
    } else if (time == '1m') {
      setreTime(60000);
      console.log('set refresh time to => 7200000');
      //document.getElementById('refreshTime').value = 1800000;
    } /* API put retime to database */
  }

  useEffect(() => {
    const interval = setInterval(function () {
      reloadData();
      console.log('testtime ' + reTime);
    }, reTime);
    return () => clearInterval(interval);
  }, [reTime]);
  return (
    <>
      <Head>
        <title>SuperCrops</title>
      </Head>
      <PageTitleWrapper>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button size="small" onClick={() => router.push('/')}>
            <Text
              color="secondary"
              style={{ fontSize: '18px', fontWeight: 'normal' }}
            >
              Main
            </Text>
          </Button>
          <ArrowForwardIosIcon fontSize="small" color="secondary" />
          <Button size="small" onClick={() => router.push('/farm')}>
            <Text
              color="secondary"
              style={{ fontSize: '18px', fontWeight: 'normal' }}
            >
              Farm
            </Text>
          </Button>
          <ArrowForwardIosIcon fontSize="small" color="secondary" />
          <Button size="small" onClick={() => router.push('/farm/station')}>
            <Text
              color="secondary"
              style={{ fontSize: '18px', fontWeight: 'normal' }}
            >
              Station
            </Text>
          </Button>
          <ArrowForwardIosIcon fontSize="small" color="secondary" />

          <Button
            ref={actionRef1}
            size="small"
            onClick={() => setinfoBox(true)}
          >
            <Text color="secondary" style={{ fontSize: '18px' }}>
              Node
            </Text>
            <ArrowDropDownIcon fontSize="small" color="secondary" />
          </Button>
        </Box>
        <Box style={{ marginLeft: 'auto' }}>
          <NodeMenu
            nodeInfo={nodeInfo}
            reTime={reTime}
            setreTime={setreTime}
            reload={reloadData}
          />
        </Box>
      </PageTitleWrapper>
      <Grid container direction="row" alignItems="stretch" spacing={0}>
        <Grid container style={{ padding: '10px' }} gap={5}>
          <Grid item xs={12} xl={12}>
            <SensorBox zoneList={zoneList} />
          </Grid>
          <Grid item xs={12} xl={12}>
            <Garph />
          </Grid>
        </Grid>
      </Grid>
      <Menu
        disableScrollLock
        anchorEl={actionRef1.current}
        onClose={() => setinfoBox(false)}
        open={infoBox}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem value={nodeInfo.nodeID}>
          <Text>{t('Node ID') + ' : ' + nodeInfo.nodeID}</Text>
        </MenuItem>
        <MenuItem value={60000}>
          <Text>{t('Status') + ' : ' + nodeInfo.status}</Text>
        </MenuItem>
        <MenuItem value={300000}>
          <Text>{t('Create Date') + ' : ' + nodeInfo.createDate}</Text>
        </MenuItem>
        <MenuItem value={900000}>
          <Text>{t('Refresh Time') + ' : ' + nodeInfo.refreshTime}</Text>
        </MenuItem>
      </Menu>
    </>
  );
}

Node.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default Node;
