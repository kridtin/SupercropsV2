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

import Slider from '@mui/material/Slider';
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
import { style } from '@mui/system';
import Nodeinfo from '../../../src/content/node/Nodeinfo';
import SensorBox from '../../../src/content/node/SensorBox';
import Garph from '../../../src/content/node/Garph';
import RelayComponent from '../../../src/content/node/RelayComponent';
import client from '../../api/mqtt';
import { getTHsensor } from '../../../assets/getTHsensor';
import { sensoricon } from '../../../assets/sensoricon';
import { isDatakeys } from '../../../assets/isDatakeys';

import styles from '../../../styles/node.module.scss';

function node() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();

  const dayactive = {
    backgroundColor: '#007bff',
    padding: '5px',
    borderRadius: '10%',
    color: 'white'
  };
  const dayunactive = {
    backgroundColor: '#e4e4e4',
    padding: '5px',
    borderRadius: '10%',
    color: '#7B879C'
  };
  const [reTime, setreTime] = useState(300000);
  const [nodeInfo, setnodeInfo] = useState({});
  const [zoneIDlist, setzoneIDlist] = useState([]);
  const [relayIDlist, setrelayIDlist] = useState([]);
  const [relayList, setrelayList] = useState([]);
  const [zoneList, setzoneList] = useState([]);
  const [zoneContent, setzoneContent] = useState([]);
  const [dataList, setdataList] = useState([]);
  const [success, setsuccess] = useState(false);
  const [wait, setwait] = useState(false);
  const [fail, setfail] = useState(false);

  const [dataSelect, setdataSelect] = useState(null);

  const [graphDataList, setgarphDataList] = useState([]);

  const [mqttStat, setmqttStat] = useState(false);
  const [mqttsending, setmqttsending] = useState(false);
  const [msgSend, setmsgSend] = useState(null);
  const [mqttopic, setmqttopic] = useState(null);

  const [deviceTopic, setdeviceTopic] = useState(null);
  const [devicemsg, setdevicemsg] = useState(null);
  const [onmsg, setonmsg] = useState(0);

  const [graph, setgraph] = useState(true);
  const [failTxt, setfailTxt] = useState('เกิดข้อผิดพลาดบางอย่าง');

  const [dataValue, setdataValue] = useState([]);
  const [dataRelay, setdataRelay] = useState('');

  async function updateRelay() {
    console.log('Updating relay: ');
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _nodeID = 'N1f8003e446ef4e6eaacb06551796f412'; //localStorage.getItem('_nodeID');
    var _relayList = [];

    const nodeInfo = await axios
      .post(`http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`, {
        orgId: _orgID
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    const relayIdList = nodeInfo.data.relayIDlist;
    for (let i = 0; i < relayIdList.length; i++) {
      const _id = relayIdList[i];
      const _relay = await axios.post(
        `http://203.151.136.127:10001/api/${_farmID}/relay`,
        {
          orgId: _orgID,
          relayId: _id
        }
      );
      _relayList.push(_relay.data);
    }
    console.log(relayIdList);
    console.log(_relayList);
    setrelayList(_relayList);
    console.log('Update success relay: ');
  }

  async function getRelayID() {
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _nodeID = 'N1f8003e446ef4e6eaacb06551796f412'; //localStorage.getItem('_nodeID');
    const nodeInfo = await axios
      .post(`http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`, {
        orgId: _orgID
      })
      .catch((error) => {
        /*
      localStorage.clear();
      window.location.assign("/login");*/
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        console.log('getRelayID Error');
      });
    const nodeInfores = nodeInfo.data;
    //console.log(nodeInfores);

    return nodeInfores.relayIDlist;
  }
  async function reloadData() {
    console.log('reloading'); /*
    if (
      localStorage.getItem('_login') == false ||
      localStorage.getItem('_login') == null ||
      localStorage.getItem('_login') == 'null' ||
      localStorage.getItem('_login') == '' ||
      localStorage.getItem('_orgID') == null ||
      localStorage.getItem('_orgID') == 'null' ||
      localStorage.getItem('_orgID') == ''
    ) {
      window.location.assign('/login');
    }*/
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _nodeID = 'N1f8003e446ef4e6eaacb06551796f412'; //localStorage.getItem('_nodeID');
    const nodeInfo = await axios
      .post(`http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`, {
        orgId: _orgID
      })
      .catch((error) => {
        /*
        localStorage.clear();
        window.location.assign("/login");*/
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    const nodeInfores = nodeInfo.data;
    getRefreshTime(nodeInfores.refreshTime);

    setnodeInfo(nodeInfores);
    setzoneIDlist(nodeInfores.zoneIDlist);
    setrelayIDlist(nodeInfores.relayIDlist);
    let z_list = [];
    let z_cont = [];
    for (let j = 0; j < nodeInfores.zoneIDlist.length; j++) {
      const zoneID = nodeInfores.zoneIDlist[j];
      const zoneres = await axios
        .post(`http://203.151.136.127:10001/api/${_farmID}/data`, {
          orgId: _orgID,
          zoneId: zoneID
        })
        .catch((error) => {
          /*
          localStorage.clear();
          window.location.assign("/login");*/

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
      const _zdata = [];
      for (var key in zoneres.data[0]) {
        if (zoneres.data[0].hasOwnProperty(key)) {
          _zdata.push([key, zoneres.data[0][key]]);
        }
      }
      z_list.push(_zdata);
      z_cont.push(false);
    }
    setzoneContent(z_cont);
    setzoneList(z_list);
    var datalist = z_list;
    //console.log(z_list);

    setdataList(datalist);
    let r_list = [];
    for (let i = 0; i < nodeInfores.relayIDlist.length; i++) {
      const relayID = nodeInfores.relayIDlist[i];
      const relay = await axios.post(
        `http://203.151.136.127:10001/api/${_farmID}/relay`,
        {
          orgId: _orgID,
          relayId: relayID
        }
      );

      // set ค่า timefunction และ datafunction ด้วยตัวเอง
      //relay.data.dataFunction = true;
      //relay.data.timeFunction = true;
      //=========================================
      r_list.push(relay.data);
    }
    setrelayList(r_list);
    setdataSelect(null);
    console.log(r_list);
    setonmsg(onmsg + 1);
  }

  //=======================================//
  //=============Supsciption===============//
  //=======================================//
  useEffect(async () => {
    if (localStorage.graphData != undefined) {
      setgarphDataList(JSON.parse(localStorage.graphData));
    }
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a'; //localStorage.getItem("_orgID");
    const _farmID = 'F184b91fec195443c829aaaebcdaeae16'; //localStorage.getItem('_farmID');
    const _nodeID = 'N1f8003e446ef4e6eaacb06551796f412'; //localStorage.getItem('_nodeID');
    const relayidlist = await getRelayID();

    for (let index = 0; index < relayidlist.length; index++) {
      const relay = relayidlist[index];
      //console.log(relay);
      client.subscribe(`/front/control/${_farmID}/${relay}`);
      client.subscribe(`/front/time_fn/${_farmID}/${relay}`);
      client.subscribe(`/front/set_time1/${_farmID}/${relay}`);
      client.subscribe(`/front/set_time2/${_farmID}/${relay}`);
      client.subscribe(`/front/set_time3/${_farmID}/${relay}`);
      client.subscribe(`/front/data_fn/${_farmID}/${relay}`);
      client.subscribe(`/front/set_data1/${_farmID}/${relay}`);
    }
    reloadData();
  }, []);

  //=======================================//
  // ON Recive message from device //
  //=======================================//

  useEffect(() => {
    client.on('message', function (topic, message) {
      const msgJson = JSON.parse(message.toString());
      const _topic = topic.toString();
      const _relayID = _topic.substring(_topic.length - 33, _topic.length);
      //console.log("relayID is  => " + _relayID);
      //console.log(message.toString());
      const waitingstatus = document.getElementById('Waiting').style.display;

      if (waitingstatus == 'block') {
        if (msgJson.status == 'success') {
          updateRelay();
          //reloadData();
        }
        setwait(false);
        setsuccess(true);
        setmqttsending(false);
        //setonmsg(onmsg + 1);
      } else {
        if (msgJson.status == 'success') {
          updateRelay();
          //reloadData();
        }
        setonmsg(onmsg + 1);
      }
    });
  }, []);

  function zoneToggle(index) {
    const content = document.getElementById('zidContent' + index);
    const icon = document.getElementById('zicon' + index);
    if (icon.className == 'fa fa-chevron-up') {
      icon.className = 'fa fa-chevron-down';
      content.style.display = 'none';
    } else {
      icon.className = 'fa fa-chevron-up';
      content.style.display = 'block';
    }
  }
  function dataChange(event, newValue) {
    setdataValue(newValue);
  }
  function modalOn(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'block';
  }
  function modalOff(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'none';
  }
  function putminiData(relayIndex, relayID, dataIndex) {
    const _farmID = localStorage.getItem('_farmID');
    const _orgId = localStorage.getItem('_orgID');
    const zoneindex = document.getElementById('selectzone' + relayIndex).value;
    console.log('zone index ' + zoneindex);
    if (zoneindex == -1) {
      setfail(true);
      setfailTxt('กรุณาเลือกโซน');
    } else {
      const zoneID = zoneIDlist[zoneindex];
      const _dataFunction = document.getElementById(
        'dStatus' + relayIndex
      ).checked;
      const _dataCheck = document.getElementById(
        'd' + dataIndex + 'Status' + relayIndex
      ).checked;
      if (_dataCheck) {
        var _dataStatus = 'true';
      } else {
        var _dataStatus = 'false';
      }
      const _dataSelect = document.getElementById(
        'dataSelect' + dataIndex + relayIndex
      ).value;

      if (_dataSelect == -1) {
        setfail(true);
        setfailTxt('กรุณาเลือกชนิดข้อมูล');
      } else {
        const _compareSelect = document.getElementById(
          'compare' + relayIndex
        ).value;
        if (_compareSelect == -1) {
          setfail(true);
          setfailTxt('กรุณาเลือกรูปแบบการทำงาน');
        } else {
          const _datamin = dataValue[0];
          const _datamax = dataValue[1];
          if (_datamin >= _datamax) {
            setfail(true);
            setfailTxt('ข้อมูลไม่ถูกต้อง');
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
                    setwait(true);
                    setmqttopic(`/front/set_data1/${_farmID}/${relayID}`);
                    setmsgSend(JSON.stringify(_putdata));
                    setonmsg(onmsg + 1);
                    setmqttsending(true);
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
  function getRefreshTime(time) {
    if (time == '5m') {
      setreTime(300000);
      console.log('set refresh time to => 300000');
      //document.getElementById('refreshTime').value = 300000;
    } else if (time == '10m') {
      setreTime(600000);
      console.log('set refresh time to => 600000');
      //document.getElementById('refreshTime').value = 600000;
    } else if (time == '15m') {
      setreTime(900000);
      console.log('set refresh time to => 900000');
      //document.getElementById('refreshTime').value = 900000;
    } else if (time == '20m') {
      setreTime(1200000);
      console.log('set refresh time to => 1200000');
      //document.getElementById('refreshTime').value = 1200000;
    } else if (time == '25m') {
      setreTime(1500000);
      console.log('set refresh time to => 1500000');
      //document.getElementById('refreshTime').value = 1500000;
    } else if (time == '30m') {
      setreTime(1800000);
      console.log('set refresh time to => 1800000');
      //document.getElementById('refreshTime').value = 1800000;
    } /* API put retime to database */
  }

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
  async function putminitime(relayIndex, relayID, timeIndex, statusID) {
    const _farmID = localStorage.getItem('_farmID');
    const _orgId = localStorage.getItem('_orgID');
    const time = [];
    const timecheck = document.getElementById(
      't' + timeIndex + 'Status' + relayIndex
    ).checked;
    // console.log("time status => " + timecheck.toString());
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
      setfail(true);
      setfailTxt('ช่วงเวลาไม่ถูกต้อง');
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
          setfail(true);
          setfailTxt('ช่วงเวลาทับซ้อนกัน');
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
                setwait(true);
                setmqttopic(`/front/set_time1/${_farmID}/${relayID}`);
                setmsgSend(JSON.stringify(_putdata));
                setonmsg(onmsg + 1);
                setmqttsending(true);
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
          setfail(true);
          setfailTxt('ช่วงเวลาทับซ้อนกัน');
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
                setwait(true);
                setmsgSend(JSON.stringify(_putdata));
                setmqttopic(`/front/set_time2/${_farmID}/${relayID}`);
                setmqttsending(true);
                setonmsg(onmsg + 1);
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
          setfail(true);
          setfailTxt('ช่วงเวลาทับซ้อนกัน');
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
                setwait(true);
                setmsgSend(JSON.stringify(_putdata));
                setmqttopic(`/front/set_time3/${_farmID}/${relayID}`);
                setmqttsending(true);
                setonmsg(onmsg + 1);
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
      modalOff('modalstyleData' + relayIndex);
    }
  }

  function setdataFunction(id, relayID) {
    const _farmID = localStorage.getItem('_farmID');
    const _orgId = localStorage.getItem('_orgID');
    const check = document.getElementById(id).checked;
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
  function settimeFunction(id, relayID, relayIndex) {
    const _farmID = localStorage.getItem('_farmID');
    const _orgId = localStorage.getItem('_orgID');
    const check = document.getElementById(id).checked;
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
  function changeStatus(id, relayID) {
    const _orgId = localStorage.getItem('_orgID');
    const _farmID = localStorage.getItem('_farmID');
    const check = document.getElementById(id).checked;

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
  useEffect(() => {
    const interval = setInterval(function () {
      reloadData();
      console.log('testtime ' + reTime);
    }, reTime);
    return () => clearInterval(interval);
  }, [reTime]);
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
            <Text color="primary" style={{ fontSize: '18px' }}>
              Main
            </Text>
          </Link>
          <Text>/</Text>
          <Link
            href="/farm"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <Text color="primary" style={{ fontSize: '18px' }}>
              Farm
            </Text>
          </Link>
          <Text>/</Text>
          <Link
            href="/farm/station"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <Text color="primary" style={{ fontSize: '18px' }}>
              Station
            </Text>
          </Link>
          <Text>/</Text>
          <Link
            href="/farm/station/node"
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <Text color="primary" style={{ fontSize: '18px' }}>
              Node
            </Text>
          </Link>
          <Text>/</Text>
        </Box>
      </PageTitleWrapper>
      <Grid container direction="row" alignItems="stretch" spacing={0}>
        <Grid container style={{ padding: '10px' }} gap={5}>
          <Grid item xs={12} xl={12}>
            <Nodeinfo nodeInfo={nodeInfo} reTime={reTime} />
          </Grid>
          <Grid item xs={12} xl={12}>
            <Garph />
          </Grid>
          <Grid item xs={12} xl={12}>
            <SensorBox zoneList={zoneList} />
          </Grid>{' '}
          {relayList.map((relay, index) => {
            const relayIndex = index + 1;
            const setting = false;
            //console.log(relay);
            return (
              <RelayComponent
                key={relay.relayID}
                relay={relay}
                index={index}
                styles={styles}
                client={client}
                setwait={setwait}
                setmsgSend={setmsgSend}
                setmqttopic={setmqttopic}
                setonmsg={setonmsg}
                onmsg={onmsg}
                setmqttsending={setmqttsending}
                relayList={relayList}
                zoneList={zoneList}
                dataList={dataList}
                zoneIDlist={zoneIDlist}
              />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

node.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default node;
