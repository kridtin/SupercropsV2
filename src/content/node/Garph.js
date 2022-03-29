import React from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Divider,
  Button,
  alpha,
  IconButton,
  styled,
  useTheme
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Chart } from 'src/components/Chart';

import PieChartTwoToneIcon from '@mui/icons-material/PieChartTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import CountUp from 'react-countup';

import axios from 'axios';
const CardBorderBottom = styled(Card)(
  ({ theme }) => `
    border-bottom: transparent 5px solid;
    overflow: visible;
    box-shadow: 0 1rem 3rem ${alpha(theme.colors.alpha.black[100], 0.6)};

    transition: ${theme.transitions.create(['transform', 'border-radius'])};
    transform: scale(1);
    transform-origin: center;

    &:hover {
        border-radius: ${theme.general.borderRadiusLg};
        transform: scale(1.05);
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

const BoxComposed = styled(Box)(
  () => `
    position: relative;
  `
);

const BoxComposedContent = styled(Box)(
  () => `
    position: relative;
    z-index: 7;
  `
);

const BoxComposedImage = styled(Box)(
  () => `
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    filter: grayscale(80%);
    background-size: cover;
    height: 100%;
    width: 100%;
    border-radius: inherit;
  `
);

const BoxComposedBg = styled(Box)(
  () => `
    position: absolute;
    left: 0;
    top: 0;
    z-index: 6;
    height: 100%;
    width: 100%;
    border-radius: inherit;
  `
);
export default function Garph() {
  const { t } = useTranslation();
  const theme = useTheme();
  const chart3Options = {
    stroke: {
      curve: 'smooth',
      width: [0, 5]
    },
    theme: {
      mode: theme.palette.mode
    },
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: [alpha(theme.colors.primary.main, 0.4), theme.colors.primary.main],
    fill: {
      opacity: 1
    },
    labels: [
      '01 Aug 2021',
      '02 Aug 2021',
      '03 Aug 2021',
      '04 Aug 2021',
      '05 Aug 2021',
      '06 Aug 2021',
      '07 Aug 2021',
      '08 Aug 2021',
      '09 Aug 2021',
      '10 Aug 2021',
      '11 Aug 2021',
      '12 Aug 2021',
      '13 Aug 2021'
    ],
    xaxis: {
      type: 'datetime'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    legend: {
      show: false
    }
  };

  const chart3Data = [
    {
      name: '',
      type: '',
      data: []
    },
    {
      name: 'Expenses',
      type: 'line',
      data: [231, 442, 335, 227, 433, 222, 117, 316, 242, 252, 162, 176, 500]
    }
  ];

  async function getGraphDataConfig(zoneindex, data, index, mode) {
    const _orgID = 'Oc780373b0fa34391a5f987cc095f680a';
    const zoneID = 'Z38df17286723448abd27f8866bba39b5';
    const time1send =
      parseInt(new Date().getTime() / 1000) - 2 * 30 * 24 * 60 * 60;
    const time2send = parseInt(new Date().getTime() / 1000);
    const reqdata = {
      orgId: _orgID,
      tsdbToken:
        'YVTWev3u1OiqnX4rK7BUSExsYdHucUdCF6_90x4DgP_vHuIJjkh3Bi0XjqbUUwqln_KsLtnuS--8YqECk1C2SA==',
      zoneId: zoneID,
      graphData: 'weather_temperature',
      time1: time1send,
      time2: time2send
    };
    const _datapoint = await axios
      .post(
        `http://203.151.136.127:10002/api/tsdb/service/F184b91fec195443c829aaaebcdaeae16/N1f8003e446ef4e6eaacb06551796f412`,
        reqdata
      )
      .catch((error) => {
        if (error) {
          console.log('tsdb requset error');
          console.log(error);
          console.log('time 2:' + parseInt(new Date().getTime() / 1000));
          console.log(
            'time 1 :' +
              parseInt((new Date().getTime() - 96 * 60 * 60 * 1000) / 1000)
          );
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    console.log(_datapoint);
    /* let _garphData = {
      labels: [],
      datasets: [],
      options: { zone: '', mode: '', time, data: '' }
    };
    let adata = {
      label: '',
      data: [],
      id: '',
      backgroundColor: colorHex,
      borderColor: colorHex
    };
    console.log('datapoint');
    console.log(_datapoint.data);
    for (let i = 0; i < _datapoint.data.length; i++) {
      const data = _datapoint.data[i];
      const atime = new Date(data._time);
      const btime = new Date(data._time).getTime();

      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        const akey = keys[i];
        if (isDatakeys(akey)) {
          adata.label = getTHsensor(akey).name;
          adata.data.push(data[akey]);
        }
      }
      _garphData.labels.push(btime);
    }
    let temp_state = graphDataList;
    _garphData.id = temp_state[index].id;
    _garphData.datasets.push(adata);
    _garphData.options.zone = parseInt(zoneindex);
    _garphData.options.mode = parseInt(mode);
    _garphData.options.time = time;
    _garphData.options.data = data;
    console.log(_garphData);
    temp_state[index] = _garphData;
    props.setgarphDataList((graphDataList) => [...temp_state]);
    localStorage.setItem('graphData', JSON.stringify(temp_state));

    localStorage.setItem('graphData', JSON.stringify(graphDataList));*/
  }

  return (
    <Card>
      <Box p={3}>
        <Box>
          <Typography gutterBottom variant="h3">
            {t('Data Graph')}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: `${theme.typography.pxToRem(15)}`
            }}
          >
            {t('Data')}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box flexGrow={1} px={2} pb={2}>
        <Chart
          options={chart3Options}
          series={chart3Data}
          type="line"
          height={'400px'}
        />
      </Box>
      <Divider />
      <Box
        p={3}
        sx={{
          textAlign: 'center',
          background: `${theme.colors.alpha.black[5]}`
        }}
      >
        <Button
          size="large"
          onClick={() => getGraphDataConfig()}
          sx={{
            px: 2,
            transform: 'translateY(0px)',
            transition: `${theme.transitions.create(['all'])}`,
            boxShadow: `${theme.colors.shadows.primary}`,
            fontSize: `${theme.typography.pxToRem(14)}`,

            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `${theme.colors.shadows.primary}`
            },
            '&:active': {
              boxShadow: 'none'
            }
          }}
          variant="contained"
          startIcon={<PieChartTwoToneIcon />}
        >
          {t('Menu')}
        </Button>
      </Box>
    </Card>
  );
}
