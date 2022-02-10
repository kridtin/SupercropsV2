import {
  Box,
  Card,
  Container,
  Button,
  styled,
  Divider,
  Typography,
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
import { style } from '@mui/system';

function DashboardAnalytics() {
  const router = useRouter();

  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Node Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <Link href="/">Main</Link>
        {' / '}
        <Link href="/">Farm</Link>
        {' / '}
        <Link href="/">Station</Link>
        {' / '}
        <Link href="/">Farm</Link>
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Card>
            <Grid
              sx={{
                px: 4
              }}
              container
              direction="row"
              alignItems="stretch"
            >
              <Grid xs={12} lg={3}>
                <Box
                  px={3}
                  py={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ borderRight: '1px solid grey' }}
                >
                  Node ID
                </Box>
              </Grid>
              <Grid xs={12} lg={3}>
                <Box
                  px={3}
                  py={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ borderRight: '1px solid grey' }}
                >
                  Status
                </Box>
              </Grid>
              <Grid xs={12} lg={3}>
                <Box
                  px={3}
                  py={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ borderRight: '1px solid grey' }}
                >
                  Build Date
                </Box>
              </Grid>
              <Grid xs={12} lg={3}>
                <Box
                  px={3}
                  py={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ borderRight: '1px solid grey' }}
                >
                  Refresh Time
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} xl={3}>
          <Card>
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              Status
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} xl={3}>
          <Card>
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              Build Date
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} xl={3}>
          <Card>
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              Refrash Time
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>2</Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={2}
          style={{ backgroundColor: 'red' }}
        >
          <Card>sensor 1</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
          <Card>sensor 2</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
          <Card>sensor 3</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
          <Card>sensor 4</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
          <Card>sensor 5</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
          <Card>sensor 6</Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>relay 1</Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>relay 2</Card>
        </Grid>
      </Grid>
    </>
  );
}

DashboardAnalytics.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardAnalytics;
