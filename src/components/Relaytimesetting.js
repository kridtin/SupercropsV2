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
  Modal,
  Input,
  Checkbox,
  List,
  ListItem
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from 'next/dist/client/image';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/node.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  maxWidth: '600px'
};

export const settingActive = {
  display: 'flex',
  gap: '10px',
  padding: '5px',
  border: 'solid 1px #c4c4c4',
  borderRadius: '10px',
  flexDirection: 'column'
};
export const settingDeactive = {
  display: 'flex',
  gap: '10px',
  padding: '5px',
  border: 'solid 1px #c4c4c4',
  borderRadius: '10px',
  flexDirection: 'column',
  backgroundColor: '#eaeaea'
};

export const HeadControl = styled(Box)(
  ({ theme }) => `
      color: ${theme.colors.primary.main};
      width: 100%;     

      .MuiBox-root {
        height: 100%;
        align-items: center;
        justify-content: flex-start;
        display: flex;
        position: relative;
        flex-direction: row;
        gap: 20px;

        .MuiTypography-root {
          color: ${theme.colors.alpha.black[100]};
        }

        .MuiTypography-caption {
          color: ${theme.colors.alpha.black[20]};
        }

        .MuiSwitch-root {
          position: absolute;
          top: ${theme.spacing(2)};
          right: ${theme.spacing(2)};
        }       
      } 
`
);

export const DaySelect = styled(Box)(
  ({ theme }) => `
      color: ${theme.colors.primary.main};
      width: 100%;     
      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"] + label {
        display: inline-block;
        font-size: 12px;
        background: ${theme.colors.alpha.black[20]};
        border: transparent solid 1px;
        border-color: ${theme.colors.primary.main};
        height: 30px;
        width: 68px;
        line-height: 30px;
        text-align: center;
        margin-right: 3px;
        border-radius: 10px;
      }
      input[type="checkbox"] + label:hover {
        cursor: pointer;
        border: transparent solid 1px;
        background: ${theme.colors.primary.lighter};
        border-color: ${theme.colors.primary.main};
      }
      input[type="checkbox"]:checked + label {
        background: ${theme.colors.primary.main};
        color: white;
      }
      input[type="checkbox"]:checked + label:hover {
        cursor: pointer;
        border: transparent solid 1px;
        color: ${theme.colors.primary.main};
        background: ${theme.colors.primary.lighter};
        border-color: ${theme.colors.primary.main};
      }
`
);

export default function Relaytimesetting(props) {
  const { t } = useTranslation();
  const relay = props.relay;
  const relayIndex = props.relayIndex;
  const modal = props.modal;
  const client = props.client;
  const relayList = props.relayList;

  function timematch(relayid, timeindex, timeon, timeoff, date, status) {
    //console.log("timematch is on work");
    for (let i = 0; i < relayList.length; i++) {
      const relay = relayList[i];
      if (relayid == relay.relayID) {
        // console.log("relayid == relay.relayID");
        if (timeindex == 1) {
          // console.log("timeindex == 1");
          if (status == 'false') {
            return 'true';
          } else {
            //console.log("status != false");
            var relay_time1 = relay.time2;
            var relay_time2 = relay.time3;
            //console.log("relay time1 status => " + relay_time1.status);
            if (relay_time1.status == false && relay_time2.status == false) {
              //console.log("return true");
              return 'true';
            } else {
              for (let i = 0; i < relay_time1.date.length; i++) {
                const _date = relay_time1.date[i];
                const _timeon = relay_time1.time_on;
                const _timeoff = relay_time1.time_off;
                if (_date == date[i] && date[i] == 1) {
                  if (timeon > _timeon && timeon < _timeoff) {
                    return 'false';
                  } else if (timeon < _timeon && timeoff > _timeon) {
                    return 'false';
                  } else if (timeon == _timeon && timeoff == timeoff) {
                    return 'false';
                  } else {
                    return 'true';
                  }
                }
              }
            }
            //console.log("relay time1 status => " + relay_time1.status);
            if (relay_time2.status == false && relay_time2.status == false) {
              return 'true';
            } else {
              for (let i = 0; i < relay_time2.date.length; i++) {
                const _date = relay_time2.date[i];
                const _timeon = relay_time2.time_on;
                const _timeoff = relay_time2.time_off;
                if (_date == date[i] && date[i] == 1) {
                  if (timeon > _timeon && timeon < _timeoff) {
                    return 'false';
                  } else if (timeon < _timeon && timeoff > _timeon) {
                    return 'false';
                  } else if (timeon == _timeon && timeoff == timeoff) {
                    return 'false';
                  } else {
                    return 'true';
                  }
                }
              }
            }
          }
        } else if (timeindex == 2) {
          //console.log("timeindex == 2");
          if (status == 'false') {
            //console.log("status == false");
            return true;
          } else {
            var relay_time1 = relay.time1;
            var relay_time2 = relay.time3;

            if (relay_time1.status == false && relay_time2.status == false) {
              //console.log("chacktime1 = false");
              return 'true';
            } else {
              for (let i = 0; i < relay_time1.date.length; i++) {
                const _date = relay_time1.date[i];
                const _timeon = relay_time1.time_on;
                const _timeoff = relay_time1.time_off;
                if (_date == date[i] && date[i] == 1) {
                  if (timeon > _timeon && timeon < _timeoff) {
                    return 'false';
                  } else if (timeon < _timeon && timeoff > _timeon) {
                    return 'false';
                  } else if (timeon == _timeon && timeoff == timeoff) {
                    return 'false';
                  } else {
                    return 'true';
                  }
                }
              }
            }
            if (relay_time2.status == false && relay_time2.status == false) {
              //console.log("chacktime2 = false");
              return 'true';
            } else {
              for (let i = 0; i < relay_time2.date.length; i++) {
                const _date = relay_time2.date[i];
                const _timeon = relay_time2.time_on;
                const _timeoff = relay_time2.time_off;
                if (_date == date[i] && date[i] == 1) {
                  if (timeon > _timeon && timeon < _timeoff) {
                    return 'false';
                  } else if (timeon < _timeon && timeoff > _timeon) {
                    return 'false';
                  } else if (timeon == _timeon && timeoff == timeoff) {
                    return 'false';
                  } else {
                    return 'true';
                  }
                }
              }
            }
          }
        } else if (timeindex == 3) {
          //console.log("timeindex == 3");
          if (status == 'false') {
            //console.log("status == false");
            return 'true';
          } else {
            var relay_time1 = relay.time2;
            var relay_time2 = relay.time1;
            if (relay_time1.status == false && relay_time2.status == false) {
              //console.log("chacktime1 = false");
              return 'true';
            } else {
              for (let i = 0; i < relay_time1.date.length; i++) {
                const _date = relay_time1.date[i];
                const _timeon = relay_time1.time_on;
                const _timeoff = relay_time1.time_off;
                if (_date == date[i] && date[i] == 1) {
                  if (timeon > _timeon && timeon < _timeoff) {
                    return 'false';
                  } else if (timeon < _timeon && timeoff > _timeon) {
                    return 'false';
                  } else if (timeon == _timeon && timeoff == timeoff) {
                    return 'false';
                  } else {
                    return 'true';
                  }
                }
              }
            }
            if (relay_time2.status == false && relay_time2.status == false) {
              // console.log("chacktime2 = false");
              return 'true';
            } else {
              for (let i = 0; i < relay_time2.date.length; i++) {
                const _date = relay_time2.date[i];
                const _timeon = relay_time2.time_on;
                const _timeoff = relay_time2.time_off;
                if (_date == date[i] && date[i] == 1) {
                  if (timeon > _timeon && timeon < _timeoff) {
                    return 'false';
                  } else if (timeon < _timeon && timeoff > _timeon) {
                    return 'false';
                  } else if (timeon == _timeon && timeoff == timeoff) {
                    return 'false';
                  } else {
                    return 'true';
                  }
                }
              }
            }
          }
        } else {
          console.log('no timeindex');
        }
      } else {
        console.log('relayid !== relay.relayID');
      }
    }
  }

  async function putTime(relayIndex, relayID, timeIndex, statusID) {
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _orgId = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const time = [];
    const timecheck = document.getElementById(
      't' + timeIndex + 'Status' + relayIndex
    ).checked;
    if (timecheck) {
      var _status = 'true';
    } else {
      var _status = 'false';
    }
    const timeon = document.getElementById(
      'time' + timeIndex + 'on' + relayIndex
    ).value;
    const timeoff = document.getElementById(
      'time' + timeIndex + 'off' + relayIndex
    ).value;

    if (timeon >= timeoff) {
      //setfail(true);
      //setfailTxt('ช่วงเวลาไม่ถูกต้อง');
    } else {
      for (let i = 0; i <= 6; i++) {
        const check = document.getElementById(
          't' + timeIndex + 'day' + i + relayIndex
        ).checked;
        if (check) {
          time.push(1);
        } else {
          time.push(0);
        }
      }
      if (timeIndex == 1) {
        //console.log("call timemacth()");
        const checktime = timematch(
          relayID,
          timeIndex,
          timeon,
          timeoff,
          time,
          _status
        );
        if (checktime == 'false') {
          //setfail(true);
          //setfailTxt('ช่วงเวลาทับซ้อนกัน');
        } else {
          var _putdata = {
            time1: {
              status: _status,
              time_on: timeon,
              time_off: timeoff,
              date: time
            }
          };
          client.publish(
            `/set_time1/${_farmID}/${relayID}`,
            JSON.stringify(_putdata),
            function (err) {
              if (!err) {
                console.log('!!****=Publiching Data=****!!');
                console.log(_putdata);
                console.log('=============================');
                console.log(_putdata);
                //setwait(true);
                //setmqttopic(`/front/set_time1/${_farmID}/${relayID}`);
                //setmsgSend(JSON.stringify(_putdata));
                //setonmsg(onmsg + 1);
                //setmqttsending(true);
              } else {
                console.log(err);
              }
            }
          );
        }
      } else if (timeIndex == 2) {
        const checktime = timematch(
          relayID,
          timeIndex,
          timeon,
          timeoff,
          time,
          _status
        );
        if (checktime == 'false') {
          //setfail(true);
          //setfailTxt('ช่วงเวลาทับซ้อนกัน');
        } else {
          var _putdata = {
            time2: {
              status: _status,
              time_on: timeon,
              time_off: timeoff,
              date: time
            }
          };
          client.publish(
            `/set_time2/${_farmID}/${relayID}`,
            JSON.stringify(_putdata),
            function (err) {
              if (!err) {
                console.log(
                  '$******Publich to :' +
                    `/front/set_time1/${_farmID}/${relayID}`
                );
                console.log(_putdata);
                //setwait(true);
                // setmsgSend(JSON.stringify(_putdata));
                //setmqttopic(`/front/set_time2/${_farmID}/${relayID}`);
                //setmqttsending(true);
                // setonmsg(onmsg + 1);
              } else {
                console.log(err);
              }
            }
          );
        }
      } else if (timeIndex == 3) {
        const checktime = timematch(
          relayID,
          timeIndex,
          timeon,
          timeoff,
          time,
          _status
        );
        if (checktime == 'false') {
          //setfail(true);
          //setfailTxt('ช่วงเวลาทับซ้อนกัน');
        } else {
          var _putdata = {
            time3: {
              status: _status,
              time_on: timeon,
              time_off: timeoff,
              date: time
            }
          };
          client.publish(
            `/set_time3/${_farmID}/${relayID}`,
            JSON.stringify(_putdata),
            function (err) {
              if (!err) {
                console.log(
                  '$******Publich to :' +
                    `/front/set_time1/${_farmID}/${relayID}`
                );
                console.log(_putdata);
                // setwait(true);
                // setmsgSend(JSON.stringify(_putdata));
                // setmqttopic(`/front/set_time3/${_farmID}/${relayID}`);
                // setmqttsending(true);
                // setonmsg(onmsg + 1);
              } else {
                console.log(err);
              }
            }
          );
        }
      } else {
        var _putdata = {
          orgId: _orgId
        };
        const putmethod = 'time';
      }
    }
  }

  return (
    <Box
      sx={style}
      style={{
        backgroundColor: !relay.timeFunction ? '#eaeaea' : ''
      }}
    >
      <Typography style={{ display: 'flex', alignItems: 'center' }}>
        <h2>{t('Time Setting')}</h2>
        <IconButton
          style={{ marginLeft: 'auto', marginRight: '20px' }}
          component="span"
          size="small"
          color="secondary"
        >
          <CloseIcon
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={() => modal(false)}
          />
        </IconButton>
      </Typography>
      <Box
        style={{
          display: 'flex',
          gap: '20px',
          flexDirection: 'column'
        }}
      >
        <Card
          style={
            relay.timeFunction
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '5px',
                  border: 'solid 1px #c4c4c4',
                  borderRadius: '10px'
                }
              : {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '5px',
                  border: 'solid 1px #c4c4c4',
                  borderRadius: '10px',
                  backgroundColor: '#eaeaea'
                }
          }
        >
          <label>
            <Image src="/datetime.png" width="30" height="30" />
          </label>

          <h4>
            {t('Time Setting')} {relayIndex}
          </h4>
        </Card>
        <Card style={relay.timeFunction ? settingActive : settingDeactive}>
          <HeadControl>
            <Box>
              <Typography>{t('Time Setting')} 1 :</Typography>

              <TextField
                id={'time1on' + relayIndex}
                type="time"
                defaultValue={relay.time1.time_on}
                disabled={relay.timeFunction ? false : true}
                variant="standard"
                label={t('Time On')}
                size="small"
              />
              <TextField
                id={'time1off' + relayIndex}
                type="time"
                defaultValue={relay.time1.time_on}
                disabled={relay.timeFunction ? false : true}
                variant="standard"
                label={t('Time Off')}
                size="small"
              />

              <Switch
                id={'t1Status' + relayIndex}
                color="primary"
                style={{ marginLeft: 'auto' }}
                defaultChecked={
                  relay.timeFunction
                    ? relay.time1.status
                      ? true
                      : false
                    : false
                }
              />
            </Box>
          </HeadControl>

          <Typography>{t('Day Setting 1')}</Typography>
          <DaySelect>
            <input
              type="checkbox"
              id={'t1day0' + relayIndex}
              defaultChecked={relay.time1.date[0] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day0' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Sun
            </label>
            <input
              type="checkbox"
              id={'t1day1' + relayIndex}
              defaultChecked={relay.time1.date[1] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day1' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Mon
            </label>
            <input
              type="checkbox"
              id={'t1day2' + relayIndex}
              defaultChecked={relay.time1.date[2] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day2' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Tue
            </label>
            <input
              type="checkbox"
              id={'t1day3' + relayIndex}
              defaultChecked={relay.time1.date[3] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day3' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Wed
            </label>
            <input
              type="checkbox"
              id={'t1day4' + relayIndex}
              defaultChecked={relay.time1.date[4] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day4' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Thu
            </label>
            <input
              type="checkbox"
              id={'t1day5' + relayIndex}
              defaultChecked={relay.time1.date[5] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day5' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Fri
            </label>
            <input
              type="checkbox"
              id={'t1day6' + relayIndex}
              defaultChecked={relay.time1.date[6] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day6' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Sat
            </label>
          </DaySelect>
          <Button
            className="btn btn-primary"
            style={
              relay.timeFunction
                ? { fontSize: '12px' }
                : {
                    fontSize: '12px',
                    backgroundColor: '#DDDDDD',
                    borderColor: '#DDDDDD',
                    color: '#73879C'
                  }
            }
            onClick={
              relay.timeFunction
                ? () =>
                    putTime(
                      relayIndex,
                      relay.relayID,
                      1,
                      't1Status' + relayIndex
                    )
                : () => {}
            }
            variant="outlined"
          >
            Save
          </Button>
        </Card>
        <Card style={relay.timeFunction ? settingActive : settingDeactive}>
          <HeadControl>
            <Box>
              <Typography>{t('Time Setting')} 2 :</Typography>

              <TextField
                id={'time2on' + relayIndex}
                type="time"
                defaultValue={relay.time2.time_on}
                disabled={relay.timeFunction ? false : true}
                variant="standard"
                label={t('Time On')}
                size="small"
              />
              <TextField
                id={'time2off' + relayIndex}
                type="time"
                defaultValue={relay.time2.time_on}
                disabled={relay.timeFunction ? false : true}
                variant="standard"
                label={t('Time Off')}
                size="small"
              />

              <Switch
                id={'t2Status' + relayIndex}
                color="primary"
                style={{ marginLeft: 'auto' }}
                defaultChecked={
                  relay.timeFunction
                    ? relay.time2.status
                      ? true
                      : false
                    : false
                }
              />
            </Box>
          </HeadControl>

          <Typography>{t('Day Setting 2')}</Typography>
          <DaySelect>
            <input
              type="checkbox"
              id={'t2day0' + relayIndex}
              defaultChecked={relay.time2.date[0] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t2day0' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Sun
            </label>
            <input
              type="checkbox"
              id={'t2day1' + relayIndex}
              defaultChecked={relay.time2.date[1] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t2day1' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Mon
            </label>
            <input
              type="checkbox"
              id={'t2day2' + relayIndex}
              defaultChecked={relay.time2.date[2] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t2day2' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Tue
            </label>
            <input
              type="checkbox"
              id={'t2day3' + relayIndex}
              defaultChecked={relay.time2.date[3] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t2day3' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Wed
            </label>
            <input
              type="checkbox"
              id={'t2day4' + relayIndex}
              defaultChecked={relay.time2.date[4] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t2day4' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Thu
            </label>
            <input
              type="checkbox"
              id={'t2day5' + relayIndex}
              defaultChecked={relay.time2.date[5] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t2day5' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Fri
            </label>
            <input
              type="checkbox"
              id={'t2day6' + relayIndex}
              defaultChecked={relay.time2.date[6] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t2day6' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Sat
            </label>
          </DaySelect>
          <Button
            style={
              relay.timeFunction
                ? { fontSize: '12px' }
                : {
                    fontSize: '12px',
                    backgroundColor: '#DDDDDD',
                    borderColor: '#DDDDDD',
                    color: '#73879C'
                  }
            }
            onClick={
              relay.timeFunction
                ? () =>
                    putTime(
                      relayIndex,
                      relay.relayID,
                      2,
                      't2Status' + relayIndex
                    )
                : () => {}
            }
            variant="outlined"
          >
            Save
          </Button>
        </Card>
        <Card style={relay.timeFunction ? settingActive : settingDeactive}>
          <HeadControl>
            <Box>
              <Typography>{t('Time Setting')} 1 :</Typography>

              <TextField
                id={'time3on' + relayIndex}
                type="time"
                defaultValue={relay.time3.time_on}
                disabled={relay.timeFunction ? false : true}
                variant="standard"
                label={t('Time On')}
                size="small"
              />
              <TextField
                id={'time3off' + relayIndex}
                type="time"
                defaultValue={relay.time3.time_on}
                disabled={relay.timeFunction ? false : true}
                variant="standard"
                label={t('Time Off')}
                size="small"
              />

              <Switch
                id={'t3Status' + relayIndex}
                color="primary"
                style={{ marginLeft: 'auto' }}
                defaultChecked={
                  relay.timeFunction
                    ? relay.time3.status
                      ? true
                      : false
                    : false
                }
              />
            </Box>
          </HeadControl>

          <Typography>{t('Day Setting 1')}</Typography>
          <DaySelect>
            <input
              type="checkbox"
              id={'t1day0' + relayIndex}
              defaultChecked={relay.time3.date[0] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t1day0' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Sun
            </label>
            <input
              type="checkbox"
              id={'t3day1' + relayIndex}
              defaultChecked={relay.time3.date[1] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t3day1' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Mon
            </label>
            <input
              type="checkbox"
              id={'t3day2' + relayIndex}
              defaultChecked={relay.time3.date[2] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t3day2' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Tue
            </label>
            <input
              type="checkbox"
              id={'t3day3' + relayIndex}
              defaultChecked={relay.time3.date[3] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t3day3' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Wed
            </label>
            <input
              type="checkbox"
              id={'t3day4' + relayIndex}
              defaultChecked={relay.time3.date[4] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t3day4' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Thu
            </label>
            <input
              type="checkbox"
              id={'t3day5' + relayIndex}
              defaultChecked={relay.time3.date[5] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t3day5' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Fri
            </label>
            <input
              type="checkbox"
              id={'t3day6' + relayIndex}
              defaultChecked={relay.time3.date[6] == 1 ? true : false}
              disabled={relay.timeFunction ? false : true}
            />
            <label
              htmlFor={'t3day6' + relayIndex}
              style={
                !relay.timeFunction
                  ? {
                      borderColor: '#dddddd',
                      backgroundColor: '#dddddd',
                      color: '#73879C'
                    }
                  : {}
              }
            >
              Sat
            </label>
          </DaySelect>
          <Button
            className="btn btn-primary"
            style={
              relay.timeFunction
                ? { fontSize: '12px' }
                : {
                    fontSize: '12px',
                    backgroundColor: '#DDDDDD',
                    borderColor: '#DDDDDD',
                    color: '#73879C'
                  }
            }
            onClick={
              relay.timeFunction
                ? () =>
                    putTime(
                      relayIndex,
                      relay.relayID,
                      3,
                      't3Status' + relayIndex
                    )
                : () => {}
            }
            variant="outlined"
          >
            Save
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
