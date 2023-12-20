import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

function NotificationPage() {
  const [data, setData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/events');
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      checkForLowRSSI(newData);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const checkForLowRSSI = (data) => {
    const lowRSSIDevice = data.find(device => device.rssi > -40);
    if (lowRSSIDevice) {
      setPopupData(lowRSSIDevice);
      setOpenPopup(true);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>UUID</TableCell>
              <TableCell>Major</TableCell>
              <TableCell>Minor</TableCell>
              <TableCell>RSSI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((device, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.uuid}</TableCell>
                <TableCell>{device.major}</TableCell>
                <TableCell>{device.minor}</TableCell>
                <TableCell>{device.rssi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openPopup && (
        <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
          <DialogTitle>Device Details</DialogTitle>
          <DialogContent>
            {popupData && Object.entries(popupData).map(([key, value]) => (
              <Typography key={key}>{`${key}: ${value}`}</Typography>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default NotificationPage;
