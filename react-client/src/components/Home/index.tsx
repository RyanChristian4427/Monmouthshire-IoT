import React, {useContext, useEffect, useState} from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react-lite';

import {LineGraph} from 'components/graphs/LineGraph';
import {PieChart} from 'components/graphs/PieChart';
import {dataProcessor} from 'components/graphs/utility/DataProcessor';
import {HeroHeader} from 'components/HeroHeader';
import {getAllData} from 'services/requests';
import {SensorDataStoreContext} from 'stores/SensorDataStore';
import {UserStoreContext} from 'stores/UserStore';

import './Home.scss';


export const Home: React.FC = observer(() => {
    const sensorDataStore = useContext(SensorDataStoreContext);
    const userStore = useContext(UserStoreContext);

    const [temperatureData, setTemperatureData] = useState();
    const [humidityData, setHumidityData] = useState();
    const [luminanceData, setLuminanceData] = useState();
    const [motionData, setMotionData] = useState();

    useEffect(() => {
        getAllData(userStore.currentObservedUser, sensorDataStore.getStartDateTime(), sensorDataStore.getEndDateTime())
            .then((data) => {
                dataProcessor(data, sensorDataStore);
                setTemperatureData(toJS(sensorDataStore.getAllTemperatureData()));
                setHumidityData(toJS(sensorDataStore.getAllHumidityData()));
                setLuminanceData(toJS(sensorDataStore.getAllLuminanceData()));
                setMotionData(toJS(sensorDataStore.getAllMotionData()));
            });
    }, [userStore, sensorDataStore]);

    return (
        <div className="home-page">
            <HeroHeader title="Home" withSettingsMenu={true}/>
            <section className="section card">
                <div className="container" id="layered-background">
                    <section className="section chart-card">
                        <LineGraph title="Temperature Over Time Per Room" xAxisTitle="Time"
                                   yAxisTitle="Temperature" height={600} width={600} data={temperatureData}
                        />
                    </section>
                    <section className="section chart-card">
                        <LineGraph title="Humidity Over Time Per Room" xAxisTitle="Time"
                                   yAxisTitle="Humidity" height={600} width={600} data={humidityData}
                        />
                    </section>
                    <section className="section chart-card">
                        <LineGraph title="Luminance Over Time Per Room" xAxisTitle="Time"
                                   yAxisTitle="Luminance" height={600} width={600} data={luminanceData}
                        />
                    </section>
                    <section className="section chart-card">
                        <PieChart title="Percent of Time Spent in Room" height={600} width={600}/>
                    </section>
                </div>
            </section>
        </div>
    );
});
