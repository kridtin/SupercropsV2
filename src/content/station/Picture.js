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
import { Grid } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Picture(props) {
  const [stapopup, setstapopup] = useState(false);
  const station = props.station;
  return (
    <>
      <img
        className="embed-responsive embed-responsive-16by9"
        src="/station-demo.png"
        style={{ minWidth: '200px', borderRadius: '2px', maxHeight: '600px' }}
      ></img>
      <Button
        variant="outlined"
        style={{ position: 'absolute', right: '50px', bottom: '50px' }}
        onClick={() => setstapopup(!stapopup)}
      >
        <InfoOutlinedIcon fontSize="small" />
        Info
      </Button>
      <Card
        style={
          stapopup
            ? { position: 'absolute', right: '50px', bottom: '100px' }
            : { display: 'none' }
        }
      >
        <ul className="list-unstyled">
          <li>
            <strong>
              <i className="fa fa-tag"></i> ชื่อ :
            </strong>{' '}
            {station.name}{' '}
          </li>
          <li>
            <strong>
              <i className="fa fa-rss"></i> รหัส :{' '}
            </strong>{' '}
            {station.stationID}
          </li>
          <li>
            <strong>
              <i className="fa fa-cloud"></i> เกทเวย์ :{' '}
            </strong>{' '}
            {station.gateway ? 'เปิด' : 'ปิด'}
          </li>
          <li>
            <strong>
              <i className="fa fa-line-chart"></i> การวิเคราะห์ :{' '}
            </strong>{' '}
            {station.analytic ? 'เปิด' : 'ปิด'}
          </li>
          <li>
            <strong>
              <i className="fa fa-code-fork"></i> บล็อกเชนต์ :{' '}
            </strong>{' '}
            {station.blockchain ? 'เปิด' : 'ปิด'}
          </li>
          <li>
            <strong>
              <i className="fa fa-cube"></i> แพคเกจ :{' '}
            </strong>{' '}
            {station.package}
          </li>
          <li>
            <strong>
              <i className="fa fa-calendar"></i> วันที่สร้าง :{' '}
            </strong>{' '}
            {station.createDate}
          </li>
          <li>
            <strong>
              <i className="fa fa-calendar-o"></i> วันหมดอายุ :{' '}
            </strong>{' '}
            {station.expireDate}
          </li>
        </ul>
      </Card>
    </>
  );
}
