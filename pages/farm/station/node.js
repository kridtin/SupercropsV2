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
import { useTranslation } from 'react-i18next';
import { style } from '@mui/system';
import Nodeinfo from '../../../src/content/node/Nodeinfo';

function DashboardAnalytics() {
  const router = useRouter();

  const { t } = useTranslation();
  const theme = useTheme();

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
          <Link
            href="/farm"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <AgricultureIcon fontSize="small" />
            <Text color="primary" style={{ fontSize: '18px' }}>
              Farm
            </Text>
          </Link>
          <Text>/</Text>
          <Link
            href="/farm/station"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <CabinIcon fontSize="small" />
            <Text color="primary" style={{ fontSize: '18px' }}>
              Station
            </Text>
          </Link>
          <Text>/</Text>
          <Link
            href="/farm/station/node"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <CabinIcon fontSize="small" />
            <Text color="primary" style={{ fontSize: '18px' }}>
              Node
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
