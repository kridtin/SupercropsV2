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
import Text from 'src/components/Text';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';

import Link from 'src/components/Link';
import Head from 'next/head';

import LanguageSwitcher from 'src/layouts/BoxedSidebarLayout/Header/Buttons/LanguageSwitcher';
import Footer from 'src/components/Footer';

import { Authenticated } from 'src/components/Authenticated';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import DashboardAnalyticsContent from 'src/content/DashboardPages/analytics';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import router from 'next/router';
import axios from 'axios';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useTranslation } from 'react-i18next';

import AgricultureIcon from '@mui/icons-material/Agriculture';
import SpaIcon from '@mui/icons-material/Spa';
import PlaceIcon from '@mui/icons-material/Place';
import HouseIcon from '@mui/icons-material/House';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { padding } from '@mui/system';

function Main() {
  const router = useRouter();
  const [farmIdList, setfarmIdList] = useState([]);
  const [farms, setfarms] = useState([]);
  const { t } = useTranslation();
  const theme = useTheme();

  const CardActionAreaWrapper = styled(CardActionArea)(
    ({ theme }) => `
          .MuiTouchRipple-root {
            opacity: .2;
          }
    
          .MuiCardActionArea-focusHighlight {
            background: ${theme.colors.primary.main};
          }
    
          &:hover {
            .MuiCardActionArea-focusHighlight {
              opacity: .05;
            }
          }
    `
  );

  const CardActions = styled(Box)(
    ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      top: ${theme.spacing(2)};
      z-index: 7;
    `
  );
  useEffect(async () => {
    /*
    const profileres = await axios.post(
      "http://80d9-2001-fb1-61-6ff2-3deb-b5ca-acd3-3713.ngrok.io/api/user/getprofile",
      { _id: logininfo.id },
      { headers: { "x-access-token": logininfo.accessToken } }
    )
    const userInfo = profileres.data;
    localStorage.setItem("userInfo", userInfo);*/
    // test orgid = O21f42baf3ce842c292092197e17002cb
    const responce = await axios
      .post(
        'http://203.151.136.127:10001/api/getFarmID/Uda237c338beb4483afdbd961fb7f6dfb',
        {
          orgId: 'O21f42baf3ce842c292092197e17002cb'
        }
      )
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    //setfarmIdList(responce.data.farmIDlist);
    setfarmIdList(['F184b91fec195443c829aaaebcdaeae16']);
    const testFarmIDList = ['F184b91fec195443c829aaaebcdaeae16'];
    for (let i = 0; i < testFarmIDList.length; i++) {
      const farmid = testFarmIDList[i];
      axios
        .post('http://203.151.136.127:10001/api/farmDetail/', {
          orgId: 'Oc780373b0fa34391a5f987cc095f680a',
          farmId: farmid
        })
        .then((res, eror) => {
          // setfarms([]);
          setfarms((farms) => [...farms, res.data]);
        });
    }
  }, []);
  /*const farmList = [
    { name: "ฟาร์มภูมิใจ", location: "อุตรดิตถ์", type: "ทุเรียน" },
    { name: "เพิ่มพูลฟาร์ม", location: "สุโขทัย", type: "ลองกอง" },
    { name: "ไร่ตันตระกูล", location: "สุโขทัย", type: "มะม่วง" },
    { name: "ทุ่งสุขสวัสดิ์", location: "น่าน", type: "ข้าวโพด" },
    { name: "สวนสตรอเบอรี่", location: "เพชรบูรณ์", type: "สตรอเบอรี่" },
  ];*/
  function link(url) {
    router.push(url);
  }
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
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <HouseIcon fontSize="small" />
            <Text color="primary" style={{ fontSize: '18px' }}>
              Main
            </Text>
          </Link>
          <Text>/</Text>
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
          <Card>
            <Grid style={{ padding: '20px', marginBottom: '-20px' }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{ display: 'flex', gap: '5px' }}
              >
                <AccountTreeTwoToneIcon fontSize="small" />
                {t('My Farm')}
              </Typography>
              <Typography variant="h6">
                <Text color="success">Total number of farms : </Text>
                <Text color="primary" style={{ marginLeft: '5px' }}>
                  {farms.length}{' '}
                </Text>
              </Typography>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{ padding: '20px', gridGap: '10px' }}
            >
              {farms.map((farm, index) => {
                console.log(farm);
                return (
                  <Grid
                    key={farm.name}
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
                        <Grid item sm={12} xl={6} lg={6}>
                          <Text
                            color="warning"
                            style={{
                              display: 'flex',
                              gap: '5px',
                              alignItems: 'center',
                              marginBottom: '10px'
                            }}
                          >
                            <AgricultureIcon fontSize="small" />
                            <label>Farm {index + 1}</label>
                          </Text>
                          <Typography
                            gutterBottom
                            variant="h4"
                            style={{
                              marginBottom: '10px'
                            }}
                          >
                            <Text color="error">{t(farm.name)}</Text>
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            style={{
                              display: 'flex',
                              gap: '5px',
                              fontWeight: 'bold'
                            }}
                          >
                            <SpaIcon fontSize="small" />{' '}
                            {t(`Product: ${farm.description}`)}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            style={{
                              display: 'flex',
                              gap: '5px',
                              fontWeight: 'bold'
                            }}
                          >
                            <PlaceIcon fontSize="small" />
                            {t('Province: Sukhothai')}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          xl={6}
                          lg={6}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Image
                            src="/station-demo.png"
                            width={160}
                            height={120}
                          />
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
                          <Link href="/farm" style={{ width: '100%' }}>
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

Main.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default Main;
