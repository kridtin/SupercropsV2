import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import HouseIcon from '@mui/icons-material/House';
import PeopleIcon from '@mui/icons-material/People';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const SideBar = [
  {
    heading: 'Farm',
    items: [
      {
        name: 'Farm Name',
        link: '/farm?fid=id',
        items: [
          {
            name: 'Station Name',
            items: [
              {
                name: 'node'
              }
            ]
          }
        ]
      }
    ]
  }
];

const menuItems = [
  {
    heading: 'Menu',
    items: [
      {
        name: 'Main',
        icon: HouseIcon,
        link: '/'
      },
      {
        name: 'Farm',
        icon: AgricultureIcon,
        link: '/testpage',
        items: [
          {
            name: 'Farm 1',
            link: '/farm?f=1'
          },
          {
            name: 'Farm 2',
            link: '/farm?f=2'
          }
        ]
      },

      {
        name: 'Organize',
        icon: PeopleIcon,
        link: '/management/users'
      }
    ]
  }
];

export default menuItems;
