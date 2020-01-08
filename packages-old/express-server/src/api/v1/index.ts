import sensorReadingRoutes from './sensorReadings';
import authRoutes from './auth';
import sensorRoutes from './sensor';

const routes = [
    authRoutes,
    sensorReadingRoutes,
    sensorRoutes
];

export default routes;
