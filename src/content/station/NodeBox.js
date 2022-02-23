import React from 'react';
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
import { useTranslation } from 'react-i18next';
import Link from 'src/components/Link';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';

export default function NodeBox(props) {
  const { t } = useTranslation();
  const node = props.nodeinfo;
  const index = props.index;
  console.log(props.nodeinfo);
  return (
    <Grid item lg={5.5} sm={12} xs={12} xl={5.5} md={5}>
      <Card variant="outlined" style={{ padding: '20px', minWidth: '300px' }}>
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
              <ModeStandbyOutlinedIcon fontSize="small" />
              <label>Node {index + 1}</label>
            </Text>
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
              <CompassCalibrationIcon fontSize="small" /> {t('ID')}
              {' : '}
              {node.nodeID}
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
              {t('Status')}
              {' : '}
              {node.status ? 'Online' : 'Offline'}
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
              {node.createDate}
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
              {t('Refresh time')}
              {' : '}
              {node.refreshTime}
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
            <Link href="/farm/station/node" style={{ width: '100%' }}>
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
}
