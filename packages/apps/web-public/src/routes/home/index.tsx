import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DateTime } from 'luxon';
import { RoomType, SensorDataResponse } from '@core/types';

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { getAllSensors } from 'services/api/sensors';

import './style.scss';

const Home: FunctionalComponent = () => {
    const [bedroomTemp, setBedroomTemp] = useState<SensorDataResponse[]>([]);

    useEffect(() => {
        getAllSensors().then((response) => {
            if (typeof response != 'string') {
                response.map((roomResponse) => {
                    if (roomResponse.roomType === RoomType.bedroom) {
                        roomResponse.temperature.map((sensorDataResponse) => {
                            setBedroomTemp((oldData) => [...oldData, sensorDataResponse]);
                        });
                    }
                });
            }
        });
    }, []);

    console.log(bedroomTemp);

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
                                <ResponsiveContainer width="99%" height={300}>
                                    <LineChart data={bedroomTemp} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis
                                            dataKey="time"
                                            tickFormatter={(timestamp): string =>
                                                DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED)
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip
                                            labelFormatter={(timestamp: string): string =>
                                                DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED)
                                            }
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
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
