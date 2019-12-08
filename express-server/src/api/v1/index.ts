import homeRoutes from './home';
import sensorReadingRoutes from './sensorReadings';
import authRoutes from './auth';
import sensorRoutes from './sensor';
import smsRoutes from './sms';


const routes = [
    authRoutes,
    homeRoutes,
    sensorReadingRoutes,
    sensorRoutes,
    smsRoutes
];

export default routes;
