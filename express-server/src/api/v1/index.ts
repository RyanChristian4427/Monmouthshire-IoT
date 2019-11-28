import homeRoutes from './home';
import sensorReadingRoutes from './sensorReadings';
import authRoutes from './auth';
import smsRoutes from './sms'

const routes = [
    authRoutes,
    homeRoutes,
    sensorReadingRoutes
    smsRoutes
];

export default routes;
