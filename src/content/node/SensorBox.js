import { React, useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  Container,
  Button,
  styled,
  Divider,
  Typography,
  CardHeader,
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
  MenuItem,
  CardContent,
  List,
  Tabs,
  Grid,
  Avatar,
  Tab
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import CompareArrowsTwoToneIcon from '@mui/icons-material/CompareArrowsTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import Text from 'src/components/Text';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import SubscriptionsTwoToneIcon from '@mui/icons-material/SubscriptionsTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';
import CountUp from 'react-countup';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Link from 'src/components/Link';
import TrafficSources from 'src/content/Dashboards/Analytics/TrafficSources';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TabsContainerWrapper = styled(CardContent)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.black[5]};
`
);
const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);
const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    padding: ${theme.spacing(1.5)};
    color: ${theme.palette.primary.contrastText};
    transform: translateY(0px);
    transition: ${theme.transitions.create([
      'color',
      'transform',
      'background'
    ])};
    
    .MuiSvgIcon-root {
        transform: scale(1);
        transition: ${theme.transitions.create(['transform'])};
    }

    &:hover {
        background: initial;
        transform: translateY(-2px);

        .MuiSvgIcon-root {
            transform: scale(1.2);
        }
    }
  `
);
export function getSensorName(text) {
  if (text == 'weather_temperature') {
    return { name: 'Weather Temperature', unit: '°C' };
  } else if (text == 'weather_humidity') {
    return { name: 'Weather Humidity', unit: '%RH' };
  } else if (text == 'weather_light_lux') {
    return { name: 'Light lux', unit: 'Lux' };
  } else if (text == 'weather_Light_par') {
    return { name: 'Light par', unit: 'umol' };
  } else if (text == 'weather_co2') {
    return { name: 'Weather co2', unit: 'ppm' };
  } else if (text == 'weather_pm25') {
    return { name: 'Weather pm25', unit: 'ug/m' };
  } else if (text == 'weather_pm10') {
    return { name: 'Weather pm10', unit: 'ug/m' };
  } else if (text == 'weather_wind_direc') {
    return { name: 'Wind Direction', unit: '°' };
  } else if (text == 'weather_wind_speed') {
    return { name: 'Wind Speed', unit: 'm/s' };
  } else if (text == 'weather_rain_gauge') {
    return { name: 'Rain gauge', unit: 'mm/h' };
  } else if (text == 'weather_pressure') {
    return { name: 'Weather Pressure', unit: 'kPa' };
  } else if (text == 'weather_o2') {
    return { name: 'Oxygen', unit: 'ppm' };
  } else if (text == 'weather_smoke') {
    return { name: 'Smoke', unit: 'ppm' };
  } else if (text == 'soil_temperature') {
    return { name: 'Soil Temperature', unit: '°C' };
  } else if (text == 'soil_moisture') {
    return { name: 'Soil Moisture', unit: '%' };
  } else if (text == 'soil_ec') {
    return { name: 'Soil EC', unit: 'uS/cm' };
  } else if (text == 'soil_ph') {
    return { name: 'Soil PH', unit: 'pH' };
  } else if (text == 'soil_n') {
    return { name: 'Nitrogen', unit: 'uS/Cm' };
  } else if (text == 'soil_p') {
    return { name: 'Phosphorus', unit: 'uS/Cm' };
  } else if (text == 'soil_k') {
    return { name: 'Potassium', unit: 'uS/Cm' };
  } else if (text == 'water_temperature') {
    return { name: 'Water Temperature', unit: '°C' };
  } else if (text == 'water_ph') {
    return { name: 'Water PH', unit: 'pH' };
  } else if (text == 'water_do') {
    return { name: 'Water o2', unit: 'mg/L' };
  } else if (text == 'water_ec') {
    return { name: 'Water EC', unit: 'uS/cm' };
  } else if (text == 'water_nh3') {
    return { name: 'Ammonia', unit: 'ppm' };
  } else if (text == 'water_cl') {
    return { name: 'Chlorine', unit: 'mg/L' };
  } else if (text == 'water_phosphate') {
    return { name: 'Phosphate', unit: 'ppm' };
  } else if (text == 'water_nitrite') {
    return { name: 'Nitrite', unit: 'mg/L' };
  } else if (text == 'water_turbidity') {
    return { name: 'Turbidity', unit: 'mg/L' };
  } else if (text == 'gas_pressure') {
    return { name: 'Pressure', unit: 'Pa' };
  } else if (text == 'gas_no2') {
    return { name: 'Nitrogen dioxide', unit: 'ppm' };
  } else if (text == 'gas_so2') {
    return { name: 'Sulfur dioxide', unit: 'ppm' };
  } else if (text == 'gas_pm25') {
    return { name: 'PM 2.5', unit: 'ug/m' };
  } else if (text == 'gas_temperature') {
    return { name: 'Temperature', unit: '°C' };
  } else {
    return text;
  }
}
export default function SensorBox(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const zoneList = props.zoneList;
  function sensoricon(text) {
    if (text == 'weather_temperature') {
      return 'https://drive.google.com/uc?export=view&id=1fDp7-7r5Xfp9ZorMx4x1zlxURalVhjyB';
    } else if (text == 'weather_humidity') {
      return 'https://drive.google.com/uc?export=view&id=1BWRVpKlzvbAcOXV6K7fG5CwSu5vjajNI';
    } else if (text == 'weather_light_lux') {
      return 'https://drive.google.com/uc?export=view&id=1k7_7fv2wjYczjBM3LmW_dQ6nNmdRE7oA';
    } else if (text == 'weather_Light_par') {
      return 'https://drive.google.com/uc?export=view&id=1k7_7fv2wjYczjBM3LmW_dQ6nNmdRE7oA';
    } else if (text == 'weather_co2') {
      return 'https://drive.google.com/uc?export=view&id=1c2_0sLf0rnIyfBtniwKonkvFhhI1l3Ej';
    } else if (text == 'weather_pm25') {
      return 'https://drive.google.com/uc?export=view&id=1gWp0H-Q4w23XzeQ6oSRe8dbuFPqqCcOk';
    } else if (text == 'weather_pm10') {
      return 'https://drive.google.com/uc?export=view&id=1gWp0H-Q4w23XzeQ6oSRe8dbuFPqqCcOk';
    } else if (text == 'weather_wind_direc') {
      return 'https://drive.google.com/uc?export=view&id=1mM8KD0Ax9mK__z4V1WIVzZel_dJeumhS';
    } else if (text == 'weather_wind_speed') {
      return 'https://drive.google.com/uc?export=view&id=1EDMsfQ7C-MNWBWu0GSGhR-OYiN0K8gGu';
    } else if (text == 'weather_rain_gauge') {
      return 'https://drive.google.com/uc?export=view&id=1NPUPuT3wgHpzSjlgAV8mNNfI0PRhj36g';
    } else if (text == 'weather_pressure') {
      return 'https://drive.google.com/uc?export=view&id=14Mee2siH0HjXMNzBptWsg9hxfRw3shOh';
    } else if (text == 'weather_o2') {
      return 'https://drive.google.com/uc?export=view&id=1yq94wdAZEZL8sjb-cFsNC1OuOKFS96o9';
    } else if (text == 'weather_smoke') {
      return 'https://drive.google.com/uc?export=view&id=1xS3xVYaTHcBzxuFZ2zk0b10JPa0wmri4';
    } else if (text == 'soil_temperature') {
      return 'https://drive.google.com/uc?export=view&id=1fDp7-7r5Xfp9ZorMx4x1zlxURalVhjyB';
    } else if (text == 'soil_moisture') {
      return 'https://drive.google.com/uc?export=view&id=1BWRVpKlzvbAcOXV6K7fG5CwSu5vjajNI';
    } else if (text == 'soil_ec') {
      return 'https://drive.google.com/uc?export=view&id=1ypBOWJEYbOSbvoAX-iC2Z-zGRZczJtxP';
    } else if (text == 'soil_ph') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'soil_n') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'soil_p') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'soil_k') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'water_temperature') {
      return 'https://drive.google.com/uc?export=view&id=1fDp7-7r5Xfp9ZorMx4x1zlxURalVhjyB';
    } else if (text == 'water_ph') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'water_do') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'water_ec') {
      return 'https://drive.google.com/uc?export=view&id=1ypBOWJEYbOSbvoAX-iC2Z-zGRZczJtxP';
    } else if (text == 'water_nh3') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'water_cl') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'water_phosphate') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'water_nitrite') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'water_turbidity') {
      return 'https://drive.google.com/uc?export=view&id=17LJRL_78OjjvWFY_zbURVBIYJ2o15cun';
    } else if (text == 'gas_pressure') {
      return 'https://drive.google.com/uc?export=view&id=14Mee2siH0HjXMNzBptWsg9hxfRw3shOh';
    } else if (text == 'gas_no2') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'gas_so2') {
      return 'https://drive.google.com/uc?export=view&id=1hqVr7EhynJHB3jzPz8yFCBLSVVl3qe5e';
    } else if (text == 'gas_pm25') {
      return 'https://drive.google.com/uc?export=view&id=1gWp0H-Q4w23XzeQ6oSRe8dbuFPqqCcOk';
    } else if (text == 'gas_temperature') {
      return 'https://drive.google.com/uc?export=view&id=1fDp7-7r5Xfp9ZorMx4x1zlxURalVhjyB';
    } else {
      return text;
    }
  }

  const testZonedata = [
    [
      ['weather_temperature', 31.7],
      ['weather_humidity', 51.1],
      ['weather_light_lux', 0],
      ['weather_co2', null],
      ['weather_pm25', null],
      ['weather_pm10', null],
      ['weather_wind_direc', 135],
      ['weather_wind_speed', 0],
      ['weather_rain_gauge', null],
      ['weather_pressure', null],
      ['soil_temperature', 0],
      ['soil_moisture', 0],
      ['soil_ec', 0],
      ['soil_ph', null],
      ['soil_n', null],
      ['soil_p', null],
      ['soil_k', null],
      ['water_temperature', 32.5],
      ['water_ph', 5.3],
      ['water_do', null],
      ['water_ec', 0],
      ['water_nh3', null],
      ['water_cl', null],
      ['water_nitrite', null],
      ['water_turbidity', null]
    ],
    [
      ['weather_temperature', 31.7],
      ['weather_humidity', 51.1],
      ['weather_light_lux', 0],
      ['weather_co2', 0],
      ['weather_pm25', 0],
      ['weather_pm10', 0],
      ['weather_wind_direc', 135],
      ['weather_wind_speed', 0],
      ['weather_rain_gauge', 0],
      ['weather_pressure', 0],
      ['soil_temperature', 0],
      ['soil_moisture', 0],
      ['soil_ec', 0],
      ['soil_ph', 0],
      ['soil_n', 0],
      ['soil_p', 0],
      ['soil_k', 0],
      ['water_temperature', 32.5],
      ['water_ph', 5.3],
      ['water_do', 0],
      ['water_ec', 0],
      ['water_nh3', 0],
      ['water_cl', 0],
      ['water_nitrite', 0],
      ['water_turbidity', 0]
    ],
    [
      ['weather_temperature', 31.7],
      ['weather_humidity', 51.1],
      ['weather_light_lux', 0],
      ['weather_co2', 0],
      ['weather_pm25', 0],
      ['weather_pm10', 0],
      ['weather_wind_direc', 135],
      ['weather_wind_speed', 0],
      ['weather_rain_gauge', 0],
      ['weather_pressure', 0],
      ['soil_temperature', 0],
      ['soil_moisture', 0],
      ['soil_ec', 0],
      ['soil_ph', 0],
      ['soil_n', 0],
      ['soil_p', 0],
      ['soil_k', 0],
      ['water_temperature', 32.5],
      ['water_ph', 5.3],
      ['water_do', 0],
      ['water_ec', 0],
      ['water_nh3', 0],
      ['water_cl', 0],
      ['water_nitrite', 0],
      ['water_turbidity', 0]
    ]
  ];
  const [currentZone, setcurrentZone] = useState(0);
  const [dataShow, setdataShow] = useState(true);
  const handleZonesChange = (_event, value) => {
    setcurrentZone(value);
  };
  return (
    <>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={() => setdataShow(!dataShow)}>
              {dataShow ? (
                <ArrowDropUpIcon color={'secondary'} />
              ) : (
                <ArrowDropDownIcon color={'secondary'} />
              )}
            </IconButton>
          }
          title={t('Data')}
        />
        {dataShow == true && (
          <>
            {' '}
            <Divider />
            <TabsContainerWrapper>
              <Tabs
                onChange={handleZonesChange}
                value={currentZone}
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
              >
                {testZonedata.map((zone, index) => (
                  <Tab
                    key={'zone' + index}
                    label={'Zone ' + (index + 1)}
                    value={index}
                  />
                ))}
              </Tabs>
            </TabsContainerWrapper>
            <Divider
              sx={{
                display: { xs: 'none', sm: 'flex' }
              }}
            />
            <Box px={3} py={3}>
              {testZonedata.map((zone, index) => {
                const zIndex = index + 1;
                //console.log(zoneList);
                //console.log('zone index = ' + index);
                //console.log('current zone = ' + currentZone);
                if (currentZone == index) {
                  return (
                    <CardContent key={'zone' + index}>
                      <Grid
                        container
                        direction="row"
                        alignItems="stretch"
                        gap={3}
                      >
                        <Grid container gap={1}>
                          {zone.map((data, _index) => {
                            const imgscr = sensoricon(data[0]);
                            if (data[1] != null) {
                              return (
                                <Grid
                                  key={data[0]}
                                  item
                                  xs={12}
                                  sm={12}
                                  lg={2.8}
                                >
                                  <Card
                                    sx={{
                                      p: 2.5,
                                      background: `${theme.colors.primary.light}`
                                    }}
                                  >
                                    <Box
                                      pb={2}
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <Box>
                                        <Typography
                                          gutterBottom
                                          component="div"
                                          variant="caption"
                                          sx={{
                                            color: `${theme.colors.alpha.trueWhite[70]}`
                                          }}
                                        >
                                          {t(getSensorName(data[0]).unit)}
                                        </Typography>
                                        <Typography
                                          variant="h3"
                                          sx={{
                                            color: `${theme.colors.alpha.trueWhite[100]}`
                                          }}
                                        >
                                          {data[1]}
                                        </Typography>
                                      </Box>
                                      <Avatar
                                        variant="rounded"
                                        sx={{
                                          width: `${theme.spacing(7)}`,
                                          height: `${theme.spacing(7)}`,
                                          background: `${alpha(
                                            theme.colors.alpha.trueWhite[100],
                                            0.2
                                          )}`,
                                          color: `${theme.colors.alpha.trueWhite[100]}`
                                        }}
                                      >
                                        <Avatar
                                          sx={{
                                            width: 64,
                                            height: 64
                                          }}
                                          alt="Remy Sharp"
                                          src={imgscr}
                                        />
                                      </Avatar>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                      <Typography
                                        variant="subtitle2"
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          pr: 0.5,
                                          color: `${theme.colors.alpha.trueWhite[100]}`
                                        }}
                                      ></Typography>
                                      <Typography
                                        variant="subtitle2"
                                        noWrap
                                        sx={{
                                          color: `${theme.colors.alpha.trueWhite[70]}`
                                        }}
                                      >
                                        {t(getSensorName(data[0]).name)}
                                      </Typography>
                                    </Box>
                                  </Card>
                                </Grid>
                              );
                            }
                          })}
                          <Divider />
                        </Grid>
                      </Grid>
                    </CardContent>
                  );
                }
              })}
            </Box>
          </>
        )}
      </Card>
    </>
  );
}
