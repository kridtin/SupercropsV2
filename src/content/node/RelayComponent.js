import { React, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  Avatar,
  Card,
  Grid,
  CardActionArea,
  CardContent,
  MenuItem,
  Menu,
  IconButton,
  Button,
  Switch,
  styled,
  Modal
} from '@mui/material';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import { useAuth } from 'src/hooks/useAuth';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import RouterTwoToneIcon from '@mui/icons-material/RouterTwoTone';
import WashTwoToneIcon from '@mui/icons-material/WashTwoTone';
import { useTranslation } from 'react-i18next';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SmartButtonTwoToneIcon from '@mui/icons-material/SmartButtonTwoTone';
import Text from 'src/components/Text';
import SettingsIcon from '@mui/icons-material/Settings';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { getSensorName } from './SensorBox';
import Relaytimesetting from 'src/components/Relaytimesetting';
import Relaydatasetting from 'src/components/Relaydatasetting';

const AvatarSecondary = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[10]};
    color: ${theme.colors.alpha.black[70]};
`
);

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
`
);
const CardDevice = styled(Card)(
  ({ theme }) => `
      color: ${theme.colors.primary.main};
      width: 100%;

      &.Mui-active {
        background: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};

        .MuiCardActionArea-root {
          .MuiSvgIcon-root,
          .MuiSwitch-root .MuiSwitch-switchBase.Mui-checked,
          .MuiTypography-root,
          .MuiTypography-caption {
            color: ${theme.colors.alpha.white[100]};
          }

          .MuiSwitch-root .MuiSwitch-switchBase {

            .MuiSwitch-thumb {
              background-color: ${theme.colors.alpha.white[100]};
            }

            & + .MuiSwitch-track {
              background-color: ${theme.colors.alpha.white[30]};
            }
          }


        }
      }

      .MuiCardActionArea-root {
        padding: ${theme.spacing(3, 6, 3, 4)};
        height: 100%;
        align-items: flex-start;
        justify-content: center;
        display: flex;
        position: relative;
        flex-direction: column;
        border: transparent solid 1px;
        border-radius: inherit;
        transition: ${theme.transitions.create(['border', 'background'])};

        .MuiTypography-root {
          color: ${theme.colors.alpha.black[50]};
        }

        .MuiTypography-caption {
          color: ${theme.colors.alpha.black[100]};
        }

        .MuiSwitch-root {
          position: absolute;
          top: ${theme.spacing(2)};
          right: ${theme.spacing(2)};
        }

        &:hover {
          border-color: ${theme.colors.primary.main};
          cursor: default;
        }
      }
      
      .MuiTouchRipple-root {
        opacity: .1;
      }
`
);
const IconWrapper = styled(Box)(
  ({ theme }) => `
      padding: ${theme.spacing(2, 0)};
      color: ${theme.colors.primary.main};
      margin-left: -7px;
`
);
const dayactive = {
  backgroundColor: '#007bff',
  padding: '5px',
  borderRadius: '50px',
  color: 'white'
};
const dayunactive = {
  backgroundColor: '#e4e4e4',
  padding: '5px',
  borderRadius: '50px',
  color: '#7B879C'
};

export default function RelayComponent(props) {
  const { t } = useTranslation();
  const index = props.index;
  const relay = props.relay;
  const relayIndex = index + 1;
  const day = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const client = props.client;
  const setwait = props.setwait;
  const setmsgSend = props.setmsgSend;
  const setmqttopic = props.setmqttopic;
  const setonmsg = props.setonmsg;
  const setmqttsending = props.setmqttsending;
  const onmsg = props.onmsg;
  const relayList = props.relayList;
  const zoneList = props.zoneList;
  const zoneIDlist = props.zoneIDlist;
  const dataList = props.dataList;

  const [timeSetting, setTimeSetting] = useState(false);
  const [dataSetting, setDataSetting] = useState(false);
  const [test, settest] = useState(true);

  function dayStyle(day, status, mainStat) {
    if (mainStat) {
      if (status == 1) {
        return <AvatarPrimary>{t(day)}</AvatarPrimary>;
      } else {
        return <AvatarSecondary>{t(day)}</AvatarSecondary>;
      }
    } else {
      return <AvatarSecondary>{t(day)}</AvatarSecondary>;
    }
  }
  function changeStatus(relayID) {
    const _orgId = localStorage.getItem('_orgID');
    const _farmID = localStorage.getItem('_farmID');
    const check = event.target.checked;

    if (check) {
      var status = 'true';
    } else {
      var status = 'false';
    }
    const _putdata = {
      status: status
    };
    client.publish(
      `/control/${_farmID}/${relayID}`,
      JSON.stringify(_putdata),
      function (err) {
        if (!err) {
          console.log('!!****=Publiching Data=****!!');
          console.log(_putdata);
          console.log('=============================');
          setwait(true);
          setmsgSend(JSON.stringify(_putdata));
          setmqttopic(`/front/control/${_farmID}/${relayID}`);
          setonmsg(onmsg + 1);
          setmqttsending(true);
        } else {
          console.log(err);
        }
      }
    );
  }

  function setdataFunction(relayID) {
    const _farmID = localStorage.getItem('_farmID');
    const _orgId = localStorage.getItem('_orgID');
    const check = event.target.checked;
    if (check) {
      var _putdata = { dataFunction: 'true' };
      var _timeFn = { timeFunction: 'false' };
    } else {
      var _putdata = { dataFunction: 'false' };
      var _timeFn = { timeFunction: 'false' };
    }
    client.publish(
      `/data_fn/${_farmID}/${relayID}`,
      JSON.stringify(_putdata),
      function (err) {
        if (!err) {
          console.log('!!****=Publiching Data=****!!');
          console.log(_putdata);
          setwait(true);
          setmqttopic(`/front/data_fn/${_farmID}/${relayID}`);
          setmsgSend(JSON.stringify(_putdata));
          setonmsg(onmsg + 1);
          setmqttsending(true);
        } else {
          console.log(err);
        }
      }
    );
    const _relayList = relayList;

    let _relay = {};
    for (let i = 0; i < _relayList.length; i++) {
      const temp_relay = _relayList[i];
      console.log('relayId = ' + relayID);
      if (temp_relay.relayID == relayID) {
        _relay = _relayList[i];
      }
    }
    const predata = {
      data1: {
        status: 'false',
        data: _relay.data1.data,
        max: _relay.data1.max,
        min: _relay.data1.min,
        zoneId: _relay.data1.zoneId,
        compare: _relay.data1.compare
      }
    };
    client.publish(
      `/set_data1/${_farmID}/${relayID}`,
      JSON.stringify(predata),
      function (err) {
        if (!err) {
          console.log('!!****=Publiching Data=****!!');
          console.log(_putdata);
          console.log('=============================');
        } else {
          console.log(err);
        }
      }
    );
    client.publish(
      `/time_fn/${_farmID}/${relayID}`,
      JSON.stringify(_timeFn),
      function (err) {
        if (!err) {
          console.log('!!****and****!!');
          console.log(_timeFn);
          console.log('=============================');
        } else {
          console.log(err);
        }
      }
    );
  }

  function settimeFunction(relayID, relayIndex) {
    const _farmID = localStorage.getItem('_farmID');
    const _orgId = localStorage.getItem('_orgID');
    const check = event.target.checked;
    if (check) {
      var _putdata = { timeFunction: 'true' };
      var _datafn = { dataFunction: 'false' };
    } else {
      var _putdata = { timeFunction: 'false' };
      var _datafn = { dataFunction: 'false' };

      const _relayList = relayList;
      let _relay = {
        time1: {
          time_on: '00:00',
          time_off: '00:01',
          date: [0, 0, 0, 0, 0, 0, 0],
          status: 'false'
        },
        time2: {
          time_on: '00:00',
          time_off: '00:01',
          date: [0, 0, 0, 0, 0, 0, 0],
          status: 'false'
        },
        time3: {
          time_on: '00:00',
          time_off: '00:01',
          date: [0, 0, 0, 0, 0, 0, 0],
          status: 'false'
        }
      };
      for (let i = 0; i < _relayList.length; i++) {
        const temp_relay = _relayList[i];
        if (temp_relay.relayID == relayID) {
          _relay = _relayList[i];
        }
      }

      const time1 = {
        time1: {
          status: 'false',
          time_on: _relay.time1.time_on,
          time_off: _relay.time1.time_off,
          date: _relay.time1.date
        }
      };

      const time2 = {
        time2: {
          status: 'false',
          time_on: _relay.time2.time_on,
          time_off: _relay.time2.time_off,
          date: _relay.time2.date
        }
      };
      const time3 = {
        time3: {
          status: 'false',
          time_on: _relay.time3.time_on,
          time_off: _relay.time3.time_off,
          date: _relay.time3.date
        }
      };
    }
    client.publish(
      `/time_fn/${_farmID}/${relayID}`,
      JSON.stringify(_putdata),
      function (err) {
        if (!err) {
          console.log('!!****=Publiching Data=****!!');
          console.log(_putdata);
          setwait(true);
          setmqttopic(`/front/time_fn/${_farmID}/${relayID}`);
          setmsgSend(JSON.stringify(_putdata));
          setmqttsending(true);
          setonmsg(onmsg + 1);
        } else {
          console.log(err);
        }
      }
    );
    client.publish(
      `/data_fn/${_farmID}/${relayID}`,
      JSON.stringify(_datafn),
      function (err) {
        if (!err) {
          console.log('!!****and****!!');
          console.log(_datafn);
          console.log('=============================');
        } else {
          console.log(err);
        }
      }
    );
  }
  const handleOpen = () => settest(true);
  const handleClose = () => settest(false);
  return (
    <div key={relay.relatID} style={{ marginBottom: '20px' }}>
      <Modal
        open={timeSetting}
        onClose={() => setTimeSetting(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Relaytimesetting
          relay={relay}
          relayIndex={relayIndex}
          modal={setTimeSetting}
          client={client}
          relayList={relayList}
        />
      </Modal>{' '}
      <Modal
        open={dataSetting}
        onClose={() => setDataSetting(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Relaydatasetting
          relay={relay}
          relayIndex={relayIndex}
          modal={setDataSetting}
          client={client}
          relayList={relayList}
          zoneList={zoneList}
          zoneIDlist={zoneIDlist}
          dataList={dataList}
        />
      </Modal>
      <CardDevice
        style={{ borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}
      >
        <CardActionArea>
          <Typography fontWeight="bold" variant="caption" color="primary">
            {t('Relay')} {relayIndex}
          </Typography>

          <Switch
            color="primary"
            onChange={(event) => changeStatus(relay.relayID)}
          />
        </CardActionArea>
      </CardDevice>
      <CardDevice style={{ borderRadius: '0' }}>
        <CardActionArea>
          <Switch
            edge="end"
            color="primary"
            onClick={() => settimeFunction(relay.relayID, relayIndex)}
            checked={relay.timeFunction ? true : false}
          />
          <Grid container style={{ marginTop: '-8px' }}>
            <Typography
              fontWeight="bold"
              variant="caption"
              color="primary"
              style={{
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              {t('Time Setting')}
            </Typography>
            <IconButton
              style={{ marginLeft: 'auto', marginRight: '20px' }}
              component="span"
              size="small"
              color="secondary"
            >
              <SettingsIcon
                fontSize="small"
                onClick={
                  relay.timeFunction ? () => setTimeSetting(true) : () => {}
                }
              />
            </IconButton>
          </Grid>

          <Typography variant="h4" noWrap>
            {t('Time 1')} : {relay.time1.status ? t('On') : t('Off')}
          </Typography>
          <Typography variant="h4" noWrap>
            {t('On')} : {relay.time1.time_on} | {t('Off')} :{' '}
            {relay.time1.time_off}
          </Typography>
          <Grid
            container
            style={{
              paddingTop: '10px',
              paddingBottom: '10px'
            }}
            direction="row"
            alignItems={'center'}
            gap="5px"
          >
            <Typography variant="h4" noWrap>
              {t('Day')}
            </Typography>
            {day.map((day, dayindex) => {
              return dayStyle(
                day,
                relay.time1.date[dayindex],
                relay.timeFunction
              );
            })}
          </Grid>

          <Typography variant="h4" noWrap>
            {t('Time 2')} : {relay.time2.status ? t('On') : t('Off')}
          </Typography>
          <Typography variant="h4" noWrap>
            {t('On')} : {relay.time2.time_on} | {t('Off')} :{' '}
            {relay.time2.time_off}
          </Typography>
          <Grid
            container
            style={{
              paddingTop: '10px',
              paddingBottom: '10px'
            }}
            direction="row"
            alignItems={'center'}
            gap="5px"
          >
            <Typography variant="h4" noWrap>
              {t('Day')}
            </Typography>
            {day.map((day, dayindex) => {
              return dayStyle(
                day,
                relay.time2.date[dayindex],
                relay.timeFunction
              );
            })}
          </Grid>

          <Typography variant="h4" noWrap>
            {t('Time 3')} : {relay.time3.status ? t('On') : t('Off')}
          </Typography>
          <Typography variant="h4" noWrap>
            {t('On')} : {relay.time3.time_on} | {t('Off')} :{' '}
            {relay.time3.time_off}
          </Typography>
          <Grid
            container
            style={{
              paddingTop: '10px',
              paddingBottom: '10px'
            }}
            direction="row"
            alignItems={'center'}
            gap="5px"
          >
            <Typography variant="h4" noWrap>
              {t('Day')}
            </Typography>
            {day.map((day, dayindex) => {
              return dayStyle(
                day,
                relay.time3.date[dayindex],
                relay.timeFunction
              );
            })}
          </Grid>
        </CardActionArea>
      </CardDevice>
      <CardDevice
        style={{ borderTopRightRadius: '0', borderTopLeftRadius: '0' }}
      >
        <CardActionArea>
          <Switch
            edge="end"
            color="primary"
            checked={relay.dataFunction ? true : false}
            onClick={(event) => setdataFunction(relay.relayID)}
          />
          <Grid container style={{ marginTop: '-8px' }}>
            <Typography
              fontWeight="bold"
              variant="caption"
              color="primary"
              style={{ marginBottom: '10px' }}
            >
              {t('Data Setting')}
            </Typography>
            <IconButton
              style={{ marginLeft: 'auto', marginRight: '20px' }}
              component="span"
              size="small"
              color="secondary"
            >
              <SettingsIcon
                fontSize="small"
                onClick={
                  relay.dataFunction ? () => setDataSetting(true) : () => {}
                }
              />
            </IconButton>
          </Grid>

          <Typography variant="h4" noWrap style={{ marginBottom: '10px' }}>
            {getSensorName(relay.data1.data).name} |{' '}
            {relay.data1.status ? 'On' : 'Off'}
          </Typography>
          <Typography variant="h4" noWrap style={{ marginBottom: '10px' }}>
            {t('Compare')} : {relay.data1.compare}
          </Typography>
          <Typography variant="h4" noWrap style={{ marginBottom: '10px' }}>
            {t('Min')} : {relay.data1.min} | {t('Max')} : {relay.data1.max}
          </Typography>
        </CardActionArea>
      </CardDevice>
    </div>
  );
}
