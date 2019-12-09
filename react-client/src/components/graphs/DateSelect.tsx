import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';

import {SensorDataStoreContext} from 'stores/SensorDataStore';

import './Graphs.scss';


export const DateSelect: React.FC = observer(() => {
    const sensorDataStore = useContext(SensorDataStoreContext);

    return (
        <div className="date-select-card">
            <section className="card">
                <div className="container" id="layered-background">
                    <div className="field">
                        <label className="label">Start Date Time</label>
                        <div className="control">
                            <input className="input"
                                   type="date"
                                   placeholder="YYYY-MM-DD"
                                   value={sensorDataStore.startDate}
                                   onChange={(e): string => sensorDataStore.startDate = e.target.value}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">End Date Time</label>
                        <div className="control">
                            <input className="input"
                                   type="date"
                                   placeholder="YYYY-MM-DD"
                                   value={sensorDataStore.endDate}
                                   onChange={(e): string => sensorDataStore.endDate = e.target.value}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});
