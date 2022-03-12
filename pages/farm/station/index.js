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
  useTheme
} from '@mui/material';
import { Grid } from '@mui/material';
import Head from 'next/head';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HouseIcon from '@mui/icons-material/House';
import CabinIcon from '@mui/icons-material/Cabin';
import Text from 'src/components/Text';
import { Authenticated } from 'src/components/Authenticated';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import NodeBox from '../../../src/content/station/NodeBox';
import Picture from '../../../src/content/station/Picture';
import Link from 'src/components/Link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function station() {
  const { t } = useTranslation();
  const router = useRouter();
  //const Data = router.query;
  const [stapopup, setstapopup] = useState(false);

  const [nodeIDlist, setnodeIDlist] = useState([]);
  const [nodeList, setnodeList] = useState([]);
  const [station, setstation] = useState({});

  useEffect(async () => {
    const orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem('_orgID');
    const farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const stationID = 'S33b2024efd7d4486bdfcbaf20b1a5bee'; //localStorage.getItem('_stationID');
    const stations = await axios
      .post(`http://203.151.136.127:10001/api/${farmID}/s/${stationID}`, {
        orgId: orgID
      })
      .catch((error) => {
        /*
          localStorage.clear();
          window.location.assign("/login");*/
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    setstation(stations.data);
    console.log(stations.data);
    //const _nodeIDlist = ["Nd88a6d3b6aa64f98a6ca6ab26b5f757f"];  รอแก้ api แล้ว
    const _nodeIDlist = stations.data.nodeIDlist;
    console.log(stations.data);
    for (let i = 0; i < _nodeIDlist.length; i++) {
      const nodeid = _nodeIDlist[i];
      const nodeidstatus = await axios
        .post(`http://203.151.136.127:10001/api/${farmID}/n/${nodeid}/status`, {
          orgId: orgID
        })
        .catch((error) => {
          /*
            localStorage.clear();
            window.location.assign("/login");*/
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });

      console.log(nodeidstatus);
    }
    for (let i = 0; i < _nodeIDlist.length; i++) {
      const nodeid = _nodeIDlist[i];
      axios
        .post(`http://203.151.136.127:10001/api/${farmID}/n/${nodeid}`, {
          orgId: orgID
        })
        .catch((error) => {
          /*
            localStorage.clear();
            window.location.assign("/login");*/
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        })
        .then((res) => {
          setnodeList([]);
          setnodeList((nodeList) => [...nodeList, res.data]);
        });
    }
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
            <Text color="secondary" style={{ fontSize: '18px' }}>
              Station
            </Text>
            <ArrowDropDownIcon fontSize="small" color="secondary" />
          </Button>
        </Box>
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        alignItems="stretch"
        spacing={0}
      >
        <Grid item xs={12} md={12} xl={12} style={{ padding: '10px' }}>
          <Card style={{ marginBottom: '20px' }}>
            <Grid style={{ padding: '20px' }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{ display: 'flex', gap: '5px' }}
              >
                <CabinIcon fontSize="small" />
                {station.name}
              </Typography>
              <Typography variant="h6">
                <Text color="secondary">Total number of Node : </Text>
                <Text color="primary" style={{ marginLeft: '5px' }}>
                  {nodeList.length}{' '}
                </Text>
              </Typography>
            </Grid>
          </Card>
          <Card style={{ marginBottom: '20px' }}>
            {' '}
            <Grid
              container
              spacing={0}
              style={{
                padding: '20px',
                gridGap: '10px',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Picture station={station} />{' '}
            </Grid>
          </Card>
          <Card style={{ marginBottom: '20px' }}>
            <Grid style={{ padding: '20px', marginBottom: '-20px' }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{ display: 'flex', gap: '5px' }}
              >
                <AppsOutlinedIcon fontSize="small" />
                {t('Node List')}
              </Typography>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{ padding: '20px', gridGap: '10px' }}
            >
              {nodeList.map((node, index) => {
                return (
                  <NodeBox key={'node' + index} nodeinfo={node} index={index} />
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
station.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);
