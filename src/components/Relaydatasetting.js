import { React, useState, useEffect, useRef } from 'react';
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
  ListItem,
  InputLabel,
  Select,
  FormControl
} from '@mui/material';
import Slider from '@mui/material/Slider';
import { useTranslation } from 'react-i18next';
import Image from 'next/dist/client/image';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/node.module.scss';
import { getSensorName } from 'src/content/node/SensorBox';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';

import Text from 'src/components/Text';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  width: '600px'
};
export const settingActive = {
  display: 'flex',
  gap: '10px',
  padding: '5px',
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

export default function Relaydatasetting(props) {
  const { t } = useTranslation();
  const relay = props.relay;
  const relayIndex = props.relayIndex;
  const modal = props.modal;
  const client = props.client;
  const relayList = props.relayList;
  const zoneList = props.zoneList;
  const zoneIDlist = props.zoneIDlist;
  const dataList = props.dataList;
  const [dataValue, setdataValue] = useState([
    relay.data1.min,
    relay.data1.max
  ]);
  const [zoneSelector, setzoneSelector] = useState(false);
  const [zoneSelected, setzoneSelected] = useState(undefined);

  const [dataSelector, setdataSelector] = useState(false);
  const [dataSelected, setdataSelected] = useState(relay.data1.data);

  const [compare, setcompare] = useState(relay.data1.compare);
  const [data1Status, setdata1Status] = useState(relay.data1.status);

  function dataChange(event, newValue) {
    setdataValue(newValue);
  }
  function putData(relayIndex, relayID, dataIndex) {
    const _farmID = localStorage.getItem('_farmID');
    const _orgId = localStorage.getItem('_orgID');
    const zoneindex = zoneSelected;
    console.log('zone index ' + zoneindex);
    if (zoneindex == undefined) {
      //setfail(true);
      //setfailTxt('กรุณาเลือกโซน');
      alert('กรุณาเลือกโซน');
    } else {
      const zoneID = zoneIDlist[zoneindex];

      const _dataCheck = data1Status;
      if (_dataCheck) {
        var _dataStatus = 'true';
      } else {
        var _dataStatus = 'false';
      }
      const _dataSelect = dataSelected;

      if (_dataSelect == undefined) {
        //setfail(true);
        //setfailTxt('กรุณาเลือกชนิดข้อมูล');
        alert('กรุณาเลือกชนิดข้อมูล');
      } else {
        const _compareSelect = compare;
        if (_compareSelect == undefined) {
          //setfail(true);
          //setfailTxt('กรุณาเลือกรูปแบบการทำงาน');
          alert('กรุณาเลือกรูปแบบการทำงาน');
        } else {
          const _datamin = dataValue[0];
          const _datamax = dataValue[1];
          if (_datamin >= _datamax) {
            //setfail(true);
            //setfailTxt('ข้อมูลไม่ถูกต้อง');
            alert('ข้อมูลไม่ถูกต้อง');
          } else {
            const putmethod = 'data';
            if (dataIndex == 1) {
              const _putdata = {
                data1: {
                  status: _dataStatus,
                  data: _dataSelect,
                  max: parseInt(_datamax),
                  min: parseInt(_datamin),
                  zoneId: zoneID,
                  compare: _compareSelect
                }
              };
              console.log(_putdata);
              client.publish(
                `/set_data1/${_farmID}/${relayID}`,
                JSON.stringify(_putdata),
                function (err) {
                  if (!err) {
                    console.log('!!****=Publiching Data=****!!');
                    console.log(_putdata);
                    console.log('=============================');
                    //setwait(true);
                    //setmqttopic(`/front/set_data1/${_farmID}/${relayID}`);
                    //setmsgSend(JSON.stringify(_putdata));
                    // setonmsg(onmsg + 1);
                    //setmqttsending(true);
                  } else {
                    console.log(err);
                  }
                }
              );
              //console.log(_putData);
              //putData(_putdata, relayID, putmethod);
            } else {
              console.log('put data error');
            }
          }
        }
      }
    }
  }
  return (
    <Box
      sx={style}
      style={{
        backgroundColor: !relay.dataFunction ? '#eaeaea' : ''
      }}
    >
      <Typography style={{ display: 'flex', alignItems: 'center' }}>
        <h2>{t('Data Setting')}</h2>
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
            relay.dataFunction
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '5px',
                  borderRadius: '10px'
                }
              : {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '5px',
                  borderRadius: '10px',
                  backgroundColor: '#eaeaea'
                }
          }
        >
          <label>
            <Image src="/dataSetting.png" width="30" height="30" />
          </label>

          <h4>
            {t('Data Setting')} {relayIndex}
          </h4>
        </Card>
        <Card style={relay.dataFunction ? settingActive : settingDeactive}>
          <Box
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Text>{t('Select Zone and Data')}</Text>
            <Switch
              edge="end"
              color="primary"
              sx={{ ml: 'auto' }}
              defaultChecked={relay.data1.status ? true : false}
              onChange={(event) => setdata1Status(event.target.checked)}
            />
          </Box>
          <Box
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FormControl sx={{ mr: 1, ml: 1, minWidth: 110 }}>
              <InputLabel id="zoneSelector-label">select zone</InputLabel>
              <Select
                labelId="zoneSelector-label"
                size="small"
                id="zoneSelector"
                value={zoneSelected}
                label="select zone"
                onChange={(event) => setzoneSelected(event.target.value)}
              >
                <MenuItem value={undefined} disabled>
                  <Text>{t('Select Zone')}</Text>
                </MenuItem>
                {zoneList.map((zone, index) => {
                  return (
                    <MenuItem key={'zone' + index} value={index + 1}>
                      <Text>
                        {t('Zone')} {index + 1}
                      </Text>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {dataList.map((_data, index) => {
              return (
                <FormControl
                  key={'dataList' + index}
                  sx={{ mr: 1, ml: 1, minWidth: 110 }}
                  style={zoneSelected == index + 1 ? {} : { display: 'none' }}
                >
                  <InputLabel id="dataSelector-label">select data</InputLabel>
                  <Select
                    labelId="dataSelector-label"
                    size="small"
                    id="dataSelector"
                    value={dataSelected}
                    label="select data"
                    onChange={(event) => {
                      setdataSelected(event.target.value);
                      alert(event.target.value);
                    }}
                  >
                    <MenuItem value={undefined} disabled>
                      <Text>{t('Select Data')}</Text>
                    </MenuItem>
                    {_data.map((data, index) => {
                      if (data[1] != null) {
                        return (
                          <MenuItem kay={data[0]} value={data[0]}>
                            <Text>{getSensorName(data[0]).name}</Text>
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              );
            })}
          </Box>
          <Box
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FormControl sx={{ mr: 1, ml: 1, minWidth: 110 }}>
              <InputLabel id="Compare-label">Compare</InputLabel>
              <Select
                labelId="Compare-label"
                size="small"
                id="Compare"
                value={compare}
                label="Compare"
                onChange={(event) => setcompare(event.target.value)}
              >
                <MenuItem value={undefined} disabled>
                  <Text>{t('Select Compare')}</Text>
                </MenuItem>
                <MenuItem value={'hight'}>
                  <Text>{t('Hight')}</Text>
                </MenuItem>
                <MenuItem value={'low'}>
                  <Text>{t('Low')}</Text>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <label id={'data1' + relayIndex + 'text'}>
            <h4 className={relay.dataFunction ? 'brief2' : ''}>
              Min:{' '}
              <strong className={relay.dataFunction ? 'minvalue' : ''}>
                {dataValue[0]} <i className="fa fa-long-arrow-down"></i>
              </strong>{' '}
              | Max:{' '}
              <strong className={relay.dataFunction ? 'maxvalue' : ''}>
                {dataValue[1]} <i className="fa fa-long-arrow-up"></i>
              </strong>
            </h4>
            {/* ค่าน้อยสุด : {dataValue[0]} ค่ามากสุด :{" "}
                                {dataValue[1]} */}
          </label>

          <Slider
            key={`slider-${[relay.data1.min, relay.data1.max]}`}
            id="data1"
            defaultValue={[relay.data1.min, relay.data1.max]}
            onChange={dataChange}
            valueLabelDisplay="auto"
            disableSwap
            disabled={relay.dataFunction ? false : true}
          />

          <Button
            variant="outlined"
            style={
              relay.dataFunction
                ? {
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    fontSize: '12px'
                  }
                : {
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    maxWidth: '80px',
                    fontSize: '12px',
                    backgroundColor: '#DDDDDD',
                    borderColor: '#DDDDDD',
                    color: '#73879C'
                  }
            }
            onClick={
              relay.dataFunction
                ? () => putData(relayIndex, relay.relayID, 1)
                : () => {}
            }
          >
            {t('Save')}
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
