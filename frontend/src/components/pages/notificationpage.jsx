import { Component } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';

class MerakiDashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      notifications: [],
      showNotification: false,
      currentNotification: null,
      notificationSentForDevice: {}, // Track devices for which notifications have been sent
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
        this.setState({ data: newData }, () => {
          this.checkForNotifications(newData);
        });
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };
    this.eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
    };
  };

  stopListeningForEvents = () => {
    if (this.eventSource) {
      this.eventSource.close();
    }
  };

  checkForNotifications = (newData) => {
    const { notificationSentForDevice } = this.state;

    newData.forEach((device) => {
      if (device.nearest_ap_rssi > -40 && !notificationSentForDevice[device.id]) {
        // Check if RSSI is greater than -40 and a notification hasn't been sent for this device
        this.setState((prevState) => ({
          notifications: [...prevState.notifications, device],
          showNotification: true,
          currentNotification: device,
          notificationSentForDevice: {
            ...prevState.notificationSentForDevice,
            [device.id]: true, // Mark the device as notified
          },
        }));
      }
    });
  };

  closeNotification = () => {
    this.setState({ showNotification: false, currentNotification: null });
  };

  render() {
    const { data, notifications, showNotification, currentNotification } = this.state;

    return (
      <div>
        <Typography variant="h5" style={{ margin: '20px 0' }}>
          Meraki Dashboard
        </Typography>
        <Paper style={{ margin: '20px 0', padding: '20px' }}>
          <Typography variant="h6">Condensed Device List</Typography>
          <List>
            {data.map((device, index) => (
              <ListItem key={index}>
                <ListItemText primary={device.name || 'N/A'} secondary={`RSSI: ${device.nearest_ap_rssi}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper style={{ margin: '20px 0', padding: '20px' }}>
          <Typography variant="h6">Notifications</Typography>
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Device: ${notification.name}`} secondary={`RSSI: ${notification.nearest_ap_rssi}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Snackbar open={showNotification} autoHideDuration={6000} onClose={this.closeNotification}>
          <Alert onClose={this.closeNotification} severity="info" sx={{ width: '100%' }}>
            {currentNotification ? `Notification for ${currentNotification.name}: RSSI ${currentNotification.nearest_ap_rssi}` : ''}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default MerakiDashboardComponent;
