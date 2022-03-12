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
  Avatar,
  TableBody,
  Table,
  TableContainer,
  IconButton,
  useTheme,
  Grid,
  List,
  ListItem,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Menu,
  Tooltip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Text from 'src/components/Text';
import SidebarMenuItem from 'src/layouts/AccentSidebarLayout/Sidebar/SidebarMenu/item';
import CachedIcon from '@mui/icons-material/Cached';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsIcon from '@mui/icons-material/Settings';
import WifiIcon from '@mui/icons-material/Wifi';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/router';

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
const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(3)};
    height: ${theme.spacing(3)};
    display: inline-block;
    margin-right: ${theme.spacing(0.8)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);
export default function NodeMenu(props) {
  const router = useRouter();
  const theme = useTheme();
  const reload = props.reload;
  const { t } = useTranslation();
  const reTime = props.reTime;
  const setreTime = props.setreTime;
  const nodeInfo = props.nodeInfo;
  const [selectTime, setselectTime] = useState(3600000);
  const [testOpen, settestOpen] = useState(false);
  const [test2Open, settest2Open] = useState(false);
  const actionRef1 = useRef(null);
  const actionRef2 = useRef(null);

  function getTimeText(time) {
    if (time == 30000) {
      return '30 seconds';
    } else if (time == 300000) {
      return '1 minutes';
    } else if (time == 60000) {
      return '5 minutes';
    } else if (time == 600000) {
      return '10 minutes';
    } else if (time == 900000) {
      return '15 minutes';
    } else if (time == 1800000) {
      return '30 minutes';
    } else if (time == 3600000) {
      return '1 hours';
    } else {
      return 'error';
    }
  }
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '10px'
      }}
    >
      <Card
        style={{
          padding: '15px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Tooltip arrow title={t('Status')}>
          <DotLegend
            style={
              nodeInfo.status
                ? {
                    animation: `pulse 1s infinite`,
                    background: `${theme.colors.success.light}`
                  }
                : { background: `${theme.colors.secondary.lighter}` }
            }
          />
        </Tooltip>
        <FormControl sx={{ mr: 1, ml: 1, minWidth: 80 }}>
          <InputLabel color="secondary" id="selectTime-label">
            Time
          </InputLabel>
          <Select
            color="secondary"
            labelId="selectTime-label"
            size="small"
            id="selectTime"
            label="selectTime"
            value={selectTime}
            onChange={(event) => setreTime(event.target.value)}
          >
            <MenuItem value={undefined} disabled>
              <Text style={{ display: 'flex', gap: '5px' }}>
                <RestoreIcon fontSize="small" />
                {t('select time')}
              </Text>
            </MenuItem>
            <MenuItem value={3600000}>
              <Text style={{ display: 'flex', gap: '5px' }}>
                <RestoreIcon fontSize="small" /> {t('last 1 hours')}
              </Text>
            </MenuItem>
          </Select>
        </FormControl>
        <Tooltip arrow title={t('Refresh Time: ') + getTimeText(reTime)}>
          <IconButtonWrapper
            variant="outlined"
            ref={actionRef1}
            onClick={() => settestOpen(true)}
            style={{ color: '#73879C', borderColor: '#73879C' }}
            sx={{
              color: `${theme.colors.secondary.main}`,
              '&:hover': { background: `${theme.colors.secondary.lighter}` }
            }}
          >
            <RestoreIcon color="secondary" />
          </IconButtonWrapper>
        </Tooltip>
        <Menu
          disableScrollLock
          anchorEl={actionRef1.current}
          onClose={() => settestOpen(false)}
          open={testOpen}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <MenuItem value={30000}>
            <Text>{t('30 seconds')}</Text>
          </MenuItem>
          <MenuItem value={60000}>
            <Text>{t('1 minutes')}</Text>
          </MenuItem>
          <MenuItem value={300000}>
            <Text>{t('5 minutes')}</Text>
          </MenuItem>
          <MenuItem value={900000}>
            <Text>{t('15 minutes')}</Text>
          </MenuItem>
          <MenuItem value={1800000}>
            <Text>{t('30 minutes')}</Text>
          </MenuItem>
          <MenuItem value={3600000}>
            <Text>{t('1 hours')}</Text>
          </MenuItem>
        </Menu>
        <Tooltip arrow title={t('Refresh')}>
          <IconButtonWrapper
            onClick={reload}
            sx={{
              color: `${theme.colors.secondary.main}`,
              '&:hover': { background: `${theme.colors.secondary.lighter}` }
            }}
          >
            <CachedIcon fontSize="small" />
          </IconButtonWrapper>
        </Tooltip>
        <Tooltip arrow title={t('Control Panel')}>
          <IconButtonWrapper
            onClick={() => router.push('/farm/station/node/control')}
            sx={{
              color: `${theme.colors.secondary.main}`,
              '&:hover': { background: `${theme.colors.secondary.lighter}` }
            }}
          >
            <SettingsIcon />
          </IconButtonWrapper>
        </Tooltip>
      </Card>
    </Box>
  );
}
