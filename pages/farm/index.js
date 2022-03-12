import React, { useEffect, useState, GetStaticPaths } from 'react';
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
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'src/components/Link';
import axios from 'axios';
import { Authenticated } from 'src/components/Authenticated';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import { Grid } from '@mui/material';
import Head from 'next/head';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SpaIcon from '@mui/icons-material/Spa';
import PlaceIcon from '@mui/icons-material/Place';
import HouseIcon from '@mui/icons-material/House';
import CabinIcon from '@mui/icons-material/Cabin';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Text from 'src/components/Text';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { useTranslation } from 'react-i18next';
export default function farm(props) {
  const { t } = useTranslation();
  const router = useRouter();
  //const Data = router.query;
  const [stationID, setstationID] = useState([]);
  const [stationList, setstationList] = useState([]);
  const [farmList, setFarmList] = useState([1, 2, 3, 4, 5]);
  useEffect(async () => {
    const orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem('_orgID');
    const farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const resStation = await axios
      .post(`http://203.151.136.127:10001/api/stationMember/${farmID}`, {
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
    setstationID(resStation.data.stationIDlist);
    const stationIDlist = resStation.data.stationIDlist;
    for (let i = 0; i < stationIDlist.length; i++) {
      const stationID = stationIDlist[i];
      axios
        .post(`http://203.151.136.127:10001/api/detail/${farmID}`, {
          orgId: orgID,
          stationId: stationID
        })
        .then((resstationdata) => {
          const stationdata = resstationdata.data;
          setstationList([]);
          setstationList((stationList) => [...stationList, stationdata]);
        });
    }
  }, []);

  //

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
          <Button
            size="small"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
            onClick={() => alert('test')}
          >
            <Text
              color="secondary"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              Farm
            </Text>
            <ArrowDropDownIcon color="secondary" />
          </Button>
        </Box>
      </PageTitleWrapper>
      <Grid container direction="row" alignItems="stretch" spacing={0}>
        <Grid item xs={12} md={12} xl={12} style={{ padding: '10px' }}>
          <Card>
            <Grid style={{ padding: '20px', marginBottom: '-20px' }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{ display: 'flex', gap: '5px' }}
              >
                <AgricultureIcon fontSize="small" />
                {t('Dreams Tech Farm')}
              </Typography>
              <Typography variant="h6">
                <Text color="secondary">Total number of station : </Text>
                <Text color="primary" style={{ marginLeft: '5px' }}>
                  {stationList.length}{' '}
                </Text>
              </Typography>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{ padding: '20px', gridGap: '10px' }}
            >
              {stationList.map((station, index) => {
                console.log(station);
                return (
                  <Grid
                    key={station.name}
                    item
                    lg={5.5}
                    sm={12}
                    xs={12}
                    xl={5.5}
                    md={5}
                  >
                    <Card
                      variant="outlined"
                      style={{ padding: '20px', minWidth: '300px' }}
                    >
                      <Grid container>
                        <Grid item sm={12} xl={12} lg={12}>
                          <Text
                            color="warning"
                            style={{
                              display: 'flex',
                              gap: '5px',
                              alignItems: 'center',
                              marginBottom: '10px'
                            }}
                          >
                            <CabinIcon fontSize="small" />
                            <label>Station {index + 1}</label>
                          </Text>
                          <Typography
                            gutterBottom
                            variant="h4"
                            style={{
                              marginBottom: '10px'
                            }}
                          >
                            <Text color="error">{t(station.name)}</Text>
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            style={{
                              display: 'flex',
                              gap: '5px',
                              fontWeight: 'bold',
                              marginBottom: '5px'
                            }}
                          >
                            <CompassCalibrationIcon fontSize="small" />{' '}
                            {t('ID')}
                            {' : '}
                            {station.stationID}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            style={{
                              display: 'flex',
                              gap: '5px',
                              fontWeight: 'bold',
                              marginBottom: '5px'
                            }}
                          >
                            <Inventory2Icon fontSize="small" />
                            {t('Package')}
                            {' : '}
                            {station.package}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            style={{
                              display: 'flex',
                              gap: '5px',
                              fontWeight: 'bold',
                              marginBottom: '5px'
                            }}
                          >
                            <DateRangeIcon fontSize="small" />
                            {t('Create Date')}
                            {' : '}
                            {station.createDate}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            style={{
                              display: 'flex',
                              gap: '5px',
                              fontWeight: 'bold',
                              marginBottom: '5px'
                            }}
                          >
                            <EventBusyIcon fontSize="small" />
                            {t('Expire Date')}
                            {' : '}
                            {station.expireDate}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          sm={12}
                          xl={12}
                          style={{
                            display: 'flex',
                            width: '100%',
                            marginTop: '20px'
                          }}
                        >
                          <Link href="/farm/station" style={{ width: '100%' }}>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: 'auto', width: '100%' }}
                            >
                              <VisibilityIcon style={{ marginRight: '5px' }} />
                              Info
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

farm.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);
