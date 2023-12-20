import { Component } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

class MerakiDataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
    };
  }

  componentDidMount() {
    this.startListeningForEvents();
  }

  componentWillUnmount() {
    this.stopListeningForEvents();
  }

  startListeningForEvents = () => {
    this.eventSource = new EventSource('http://localhost:8000/events');
    this.eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        this.setState((prevState) => ({
          data: [...prevState.data, ...newData].slice(-10), // Keep only the latest 10 entries
          error: null, // Clear any previous errors
        }));
      } catch (error) {
        console.error('Error parsing SSE data:', error);
        console.log('Event data:', event.data); // Log the event data for debugging
        this.setState({ error: 'Error parsing SSE data' });
      }
    };
    this.eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      console.log('Error event:', error.event); // Log the error event for debugging
      console.log('Error status:', error.status); // Log the error status for debugging
      console.log('Error message:', error.message); // Log the error message for debugging
      this.setState({ error: 'SSE Error' });
    };
  };

  stopListeningForEvents = () => {
    if (this.eventSource) {
      this.eventSource.close();
    }
  };

  render() {
    const { data, error } = this.state;

    return (
      <div>
        <Typography variant="h5" style={{ margin: '20px 0' }}>
          Meraki Scanning Data
        </Typography>
        {error && (
          <Typography variant="body1" style={{ color: 'red' }}>
            {error}
          </Typography>
        )}
        <TableContainer
          component={Paper}
          style={{ maxHeight: 400, overflow: 'auto' }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Client MAC</TableCell>
                <TableCell>Nearest AP RSSI</TableCell>
                <TableCell>BLE Beacons</TableCell>
                <TableCell>AP MAC</TableCell>
                <TableCell>Latest Record</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((observation, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{observation.name || 'N/A'}</TableCell>
                  <TableCell>{observation.clientMac || 'N/A'}</TableCell>
                  <TableCell>
                    {observation.latestRecord
                      ? observation.latestRecord.nearestApRssi || 'N/A'
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {observation.bleBeacons &&
                      observation.bleBeacons.map((beacon, beaconIndex) => (
                        <div key={beaconIndex}>
                          <Typography variant="body2">
                            {`Beacon ${beaconIndex + 1}:`}
                          </Typography>
                          <Typography variant="body2">
                            {`Raw Data: ${beacon.rawData || 'N/A'}`}
                          </Typography>
                          <Typography variant="body2">
                            {`BLE Type: ${beacon.bleType || 'N/A'}`}
                          </Typography>
                        </div>
                      ))}
                  </TableCell>
                  <TableCell>
                    {observation.latestRecord ? (
                      <>
                        <Typography variant="body2">
                          {`Time: ${observation.latestRecord.time || 'N/A'}`}
                        </Typography>
                        <Typography variant="body2">
                          {`Nearest AP Mac: ${
                            observation.latestRecord.nearestApMac || 'N/A'
                          }`}
                        </Typography>
                        <Typography variant="body2">
                          {`Nearest AP RSSI: ${
                            observation.latestRecord.nearestApRssi || 'N/A'
                          }`}
                        </Typography>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default MerakiDataComponent;
