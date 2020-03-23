import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { CustomLineChart } from 'components/LineChart';
import { RechartsSensorDataResponse } from 'models/Recharts';
import { getAllSensors } from 'services/api/sensors';
import { dataProcessor } from 'services/dataProcessor';

import './style.scss';

const Home: FunctionalComponent = () => {
    const [temperatureData, setTemperatureData] = useState<RechartsSensorDataResponse[]>([]);
    const [luminanceData, setLuminanceData] = useState<RechartsSensorDataResponse[]>([]);
    const [motionData, setMotionData] = useState<RechartsSensorDataResponse[]>([]);
    const [ultraVioletData, setUltraVioletData] = useState<RechartsSensorDataResponse[]>([]);
    const [humidityData, setHumidityData] = useState<RechartsSensorDataResponse[]>([]);
    const [electricFlowData, setElectricFlowData] = useState<RechartsSensorDataResponse[]>([]);

    useEffect(() => {
        getAllSensors().then((response) => {
            if (typeof response != 'string') {
                const processedData = dataProcessor(response);
                setTemperatureData(processedData.temperatureDataArray);
                setLuminanceData(processedData.luminanceDataArray);
                setMotionData(processedData.motionDataArray);
                setUltraVioletData(processedData.ultraVioletDataArray);
                setHumidityData(processedData.humidityDataArray);
                setElectricFlowData(processedData.electricFlowDataArray);
            }
        });
    }, []);

    return (
        <div class="home-page">
            <section class="hero is-fullheight is-default is-bold">
                <div class="hero-head">
                    <Navbar />
                </div>
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="columns is-vcentered">
                            <div class="column is-5">
                                <CustomLineChart dataSet={temperatureData} />
                            </div>
                            <div class="column is-6 is-offset-1">
                                <h1 class="title is-2">Superhero Scaffolding</h1>
                                <h2 class="subtitle is-4">Let this cover page describe a product or service.</h2>
                                <br />
                                <p class="has-text-centered">
                                    <a class="button is-medium is-info is-outlined">Learn more</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default Home;
