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
export default function Nodeinfo() {
  return (
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
  );
}
