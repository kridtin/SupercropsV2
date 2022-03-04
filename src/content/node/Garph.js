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
