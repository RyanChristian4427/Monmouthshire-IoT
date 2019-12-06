import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';

import {LineGraph} from 'components/graphs/LineGraph';
import {PieChart} from 'components/graphs/PieChart';
import {HeroHeader} from 'components/HeroHeader';
import {getTemperatures} from 'services/requests';
import {UserStoreContext} from 'stores/UserStore';

import './Home.scss';


export const Home: React.FC = observer(() => {
    const sensorStore = useContext(UserStoreContext);
    const [data, setData] = useState();

    useEffect(() => {
        getTemperatures(sensorStore.currentObservedUser)
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);

    return (
        <div className="home-page">
            <HeroHeader title="Home" withSettingsMenu={true}/>
            <section className="section card">
                <div className="container" id="layered-background">
                    <section className="section chart-card">
                        <LineGraph title="Temperature Over Time Per Room" xAxisTitle="Time"
                                   yAxisTitle="Temperature" height={600} width={600}/>
                    </section>
                    <section className="section chart-card">
                        <PieChart title="Percent of Time Spent in Room" height={600} width={600}/>
                    </section>
                </div>
            </section>
        </div>
    );
});
