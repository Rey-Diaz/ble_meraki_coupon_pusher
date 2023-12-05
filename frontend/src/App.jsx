import { useState } from 'react';
import Layout from './components/Layout';
import DeviceTable from './components/tables/DeviceTable';
import UserNotification from './components/notifications/UserNotification';


function App() {
    const [devices, setDevices] = useState([]); // Mock data or fetch from API
    const [notification, setNotification] = useState('');

    const handleTriggerCoupon = (deviceId) => {
        // Logic to trigger coupon for a specific device
        // Set notification message
        setNotification(`Coupon sent to device ${deviceId}`);
    };

    return (
        <Layout>
            <DeviceTable devices={devices} onTriggerCoupon={handleTriggerCoupon} />
            <UserNotification message={'hello, below is the users perspective'} notificationMessage={notification} />
        </Layout> 
    );
}

export default App;
