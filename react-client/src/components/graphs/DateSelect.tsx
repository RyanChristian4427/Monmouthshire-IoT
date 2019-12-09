import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';

import {SensorDataStoreContext} from 'stores/SensorDataStore';

import './Graphs.scss';


interface IProps {
    dataType: string;
}

export const DateSelect: React.FC<IProps> = observer((props: IProps) => {
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
                                   onChange={(e): void => {
                                       sensorDataStore.startDate = e.target.value;
                                       sensorDataStore.updateData(props.dataType);
                                   }}
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
                                   onChange={(e): void => {
                                       sensorDataStore.endDate = e.target.value;
                                       sensorDataStore.updateData(props.dataType);
                                   }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});
