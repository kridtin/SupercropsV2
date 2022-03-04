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
  useTheme,
  Menu,
  MenuItem
} from '@mui/material';
import Text from 'src/components/Text';
import { Grid } from '@mui/material';
import styles from '../../../styles/node.module.scss';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';

export default function Nodeinfo(props) {
  const nodeInfo = props.nodeInfo;
  const reTime = props.reTime;
  const headText = { fontSize: '24px', fontWeight: 'bold' };

  const [openTime, setOpenTime] = useState(false);
  const [Time, setTime] = useState(reTime);
  const actionRef1 = useRef(null);

  function getTimeText(time) {
    if (time == 300000) {
      return 'Every 5 minute';
    } else if (time == 600000) {
      return 'Every 10 minute';
    } else if (time == 900000) {
      return 'Every 15 minute';
    } else if (time == 1200000) {
      return 'Every 20 minute';
    } else if (time == 1500000) {
      return 'Every 25 minute';
    } else if (time == 1800000) {
      return 'Every 30 minute';
    } else {
      return 'error';
    }
  }
  return (
    <Grid container direction="row" alignItems="stretch" gap={2}>
      <Grid item xs={12} lg={2.9}>
        <Card>
          <Box
            px={3}
            py={3}
            display="flex"
            style={{ flexDirection: 'column', gap: '10px', height: '140px' }}
          >
            <Text style={headText}>Node ID</Text>
            <Text>{nodeInfo.nodeID}</Text>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} lg={2.8}>
        <Card>
          <Box
            px={3}
            py={3}
            display="flex"
            style={{ flexDirection: 'column', gap: '10px', height: '140px' }}
          >
            <Text style={headText}>Status</Text>
            <Text>{nodeInfo.status ? 'Online' : 'Offline'}</Text>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} lg={2.8}>
        <Card>
          <Box
            px={3}
            py={3}
            display="flex"
            style={{ flexDirection: 'column', gap: '10px', height: '140px' }}
          >
            <Text style={headText}>Create Date</Text>
            <Text>{nodeInfo.createDate}</Text>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} lg={2.9}>
        <Card>
          <Box
            px={3}
            py={3}
            display="flex"
            style={{ flexDirection: 'column', gap: '10px', height: '140px' }}
          >
            <Text style={headText}>Refresh Time</Text>
            <Button
              variant="outlined"
              ref={actionRef1}
              onClick={() => setOpenTime(true)}
              sx={{
                mr: 1
              }}
              endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
              style={{ color: '#73879C', borderColor: '#73879C' }}
            >
              {getTimeText(Time)}
            </Button>
            <Menu
              disableScrollLock
              anchorEl={actionRef1.current}
              onClose={() => setOpenTime(false)}
              open={openTime}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <MenuItem
                onClick={() => {
                  setTime(300000);
                  setOpenTime(false);
                }}
              >
                <Text>Every 5 minute</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setTime(600000);
                  setOpenTime(false);
                }}
              >
                <Text>Every 10 minute</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setTime(900000);
                  setOpenTime(false);
                }}
              >
                <Text>Every 15 minute</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setTime(1200000);
                  setOpenTime(false);
                }}
              >
                <Text>Every 20 minute</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setTime(1500000);
                  setOpenTime(false);
                }}
              >
                <Text>Every 25 minute</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setTime(1800000);
                  setOpenTime(false);
                }}
              >
                <Text>Every 30 minute</Text>
              </MenuItem>
            </Menu>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
