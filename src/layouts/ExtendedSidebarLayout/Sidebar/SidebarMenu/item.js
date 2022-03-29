import { useState, useContext } from 'react';
import clsx from 'clsx';
import { SidebarContext } from 'src/contexts/SidebarContext';
import NextLink from 'next/link';
import Link from 'src/components/Link';
import PropTypes from 'prop-types';
import {
  Button,
  Tooltip,
  Badge,
  Collapse,
  useTheme,
  ListItem,
  styled,
  IconButton,
  tooltipClasses,
  Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { width } from '@mui/system';

const TooltipWrapper = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

const SidebarMenuItem = ({
  children,
  link,
  icon: Icon,
  badge,
  badgeTooltip,
  open: openParent,
  active,
  name,
  ...rest
}) => {
  const [menuToggle, setMenuToggle] = useState(openParent);
  const { t } = useTranslation();
  const { closeSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  const toggleMenu = () => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          width={'100%'}
          style={{ display: 'flex' }}
          className={clsx({ 'Mui-active': menuToggle })}
          startIcon={Icon && <Icon />}
        >
          <NextLink href={link} passHref>
            <Box>
              {badgeTooltip ? (
                <TooltipWrapper title={badgeTooltip} arrow placement="right">
                  {badge === '' ? (
                    <Badge color="primary" variant="dot" />
                  ) : (
                    <Badge badgeContent={badge} />
                  )}
                </TooltipWrapper>
              ) : badge === '' ? (
                <Badge color="primary" variant="dot" />
              ) : (
                <Badge badgeContent={badge} />
              )}
              {t(name)}
            </Box>
          </NextLink>

          {menuToggle ? (
            <ExpandLessTwoToneIcon
              fontSize="small"
              color="secondary"
              onClick={toggleMenu}
              style={{ marginLeft: 'auto' }}
            />
          ) : (
            <ExpandMoreTwoToneIcon
              fontSize="small"
              color="secondary"
              onClick={toggleMenu}
              style={{ marginLeft: 'auto' }}
            />
          )}
        </Button>

        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <NextLink href={link} passHref>
        <Button
          disableRipple
          component="a"
          className={clsx({ 'Mui-active': active })}
          onClick={closeSidebar}
          startIcon={Icon && <Icon />}
        >
          {t(name)}
          {badgeTooltip ? (
            <TooltipWrapper title={badgeTooltip} arrow placement="right">
              {badge === '' ? (
                <Badge color="primary" variant="dot" />
              ) : (
                <Badge badgeContent={badge} />
              )}
            </TooltipWrapper>
          ) : badge === '' ? (
            <Badge color="primary" variant="dot" />
          ) : (
            <Badge badgeContent={badge} />
          )}
        </Button>
      </NextLink>
    </ListItem>
  );
};

SidebarMenuItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  link: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  badgeTooltip: PropTypes.string,
  open: PropTypes.bool,
  name: PropTypes.string.isRequired
};

SidebarMenuItem.defaultProps = {
  open: false,
  active: false
};

export default SidebarMenuItem;
