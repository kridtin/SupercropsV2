import { React, useState, useEffect } from 'react';
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
  useTheme,
  Grid
} from '@mui/material';
import Head from 'next/head';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Text from 'src/components/Text';
import { Authenticated } from 'src/components/Authenticated';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import Link from 'src/components/Link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import RelayComponent from '../../../../src/content/node/RelayComponent';
import client from '../../../api/mqtt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from '../../../../styles/node.module.scss';
export default function control() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();

  const dayactive = {
    backgroundColor: '#007bff',
    padding: '5px',
    borderRadius: '10%',
    color: 'white'
  };
  const dayunactive = {
    backgroundColor: '#e4e4e4',
    padding: '5px',
    borderRadius: '10%',
    color: '#7B879C'
  };
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

  const [mqttStat, setmqttStat] = useState(false);
  const [mqttsending, setmqttsending] = useState(false);
  const [msgSend, setmsgSend] = useState(null);
  const [mqttopic, setmqttopic] = useState(null);

  const [deviceTopic, setdeviceTopic] = useState(null);
  const [devicemsg, setdevicemsg] = useState(null);
  const [onmsg, setonmsg] = useState(0);

  const [failTxt, setfailTxt] = useState('เกิดข้อผิดพลาดบางอย่าง');

  async function updateRelay() {
    console.log('Updating relay: ');
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _nodeID = 'N1f8003e446ef4e6eaacb06551796f412'; //localStorage.getItem('_nodeID');
    var _relayList = [];

    const nodeInfo = await axios
      .post(`http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`, {
        orgId: _orgID
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    const relayIdList = nodeInfo.data.relayIDlist;
    for (let i = 0; i < relayIdList.length; i++) {
      const _id = relayIdList[i];
      const _relay = await axios.post(
        `http://203.151.136.127:10001/api/${_farmID}/relay`,
        {
          orgId: _orgID,
          relayId: _id
        }
      );
      _relayList.push(_relay.data);
    }
    console.log(relayIdList);
    console.log(_relayList);
    setrelayList(_relayList);
    console.log('Update success relay: ');
  }

  async function getRelayID() {
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
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        console.log('getRelayID Error');
      });
    const nodeInfores = nodeInfo.data;
    //console.log(nodeInfores);

    return nodeInfores.relayIDlist;
  }
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
    console.log(r_list);
    setonmsg(onmsg + 1);
  }

  //=======================================//
  //=============Supsciption===============//
  //=======================================//
  useEffect(async () => {
    if (localStorage.graphData != undefined) {
      setgarphDataList(JSON.parse(localStorage.graphData));
    }
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _nodeID = 'N1f8003e446ef4e6eaacb06551796f412'; //localStorage.getItem('_nodeID');
    const relayidlist = await getRelayID();

    for (let index = 0; index < relayidlist.length; index++) {
      const relay = relayidlist[index];
      //console.log(relay);
      client.subscribe(`/front/control/${_farmID}/${relay}`);
      client.subscribe(`/front/time_fn/${_farmID}/${relay}`);
      client.subscribe(`/front/set_time1/${_farmID}/${relay}`);
      client.subscribe(`/front/set_time2/${_farmID}/${relay}`);
      client.subscribe(`/front/set_time3/${_farmID}/${relay}`);
      client.subscribe(`/front/data_fn/${_farmID}/${relay}`);
      client.subscribe(`/front/set_data1/${_farmID}/${relay}`);
    }
    reloadData();
  }, []);

  //=======================================//
  // ON Recive message from device //
  //=======================================//

  useEffect(() => {
    client.on('message', function (topic, message) {
      const msgJson = JSON.parse(message.toString());
      const _topic = topic.toString();
      const _relayID = _topic.substring(_topic.length - 33, _topic.length);
      //console.log("relayID is  => " + _relayID);
      //console.log(message.toString());
      const waitingstatus = document.getElementById('Waiting').style.display;

      if (waitingstatus == 'block') {
        if (msgJson.status == 'success') {
          updateRelay();
          //reloadData();
        }
        setwait(false);
        setsuccess(true);
        setmqttsending(false);
        //setonmsg(onmsg + 1);
      } else {
        if (msgJson.status == 'success') {
          updateRelay();
          //reloadData();
        }
        setonmsg(onmsg + 1);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>SuperCrops</title>
      </Head>
      <PageTitleWrapper>
        <Box
          style={{
            display: 'flex',
            gap: '5px',
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
            size="small"
            onClick={() => router.push('/farm/station/node')}
          >
            <Text
              color="secondary"
              style={{ fontSize: '18px', fontWeight: 'normal' }}
            >
              Node
            </Text>
          </Button>
          <ArrowForwardIosIcon fontSize="small" color="secondary" />
          <Button size="small">
            <Text color="secondary" style={{ fontSize: '18px' }}>
              Controller
            </Text>
            <ArrowDropDownIcon fontSize="small" color="secondary" />
          </Button>
        </Box>
      </PageTitleWrapper>
      <Grid container direction="row" alignItems="stretch" spacing={0}>
        <Grid container style={{ padding: '10px' }} gap={5}>
          {relayList.map((relay, index) => {
            return (
              <RelayComponent
                key={relay.relayID}
                relay={relay}
                index={index}
                styles={styles}
                client={client}
                setwait={setwait}
                setmsgSend={setmsgSend}
                setmqttopic={setmqttopic}
                setonmsg={setonmsg}
                onmsg={onmsg}
                setmqttsending={setmqttsending}
                relayList={relayList}
                zoneList={zoneList}
                dataList={dataList}
                zoneIDlist={zoneIDlist}
              />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
control.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);
