import React, {useContext} from 'react';
import { XYPlot,
    XAxis, YAxis, HorizontalGridLines, LineSeries,} from 'react-vis';

import {UserStoreContext} from 'stores/UserStore';

interface IProps {
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
    height: number;
    width: number;
}

const defaultDate = '2019-11-27';

export const LineGraph: React.FC<IProps> = (props: IProps) => {
    const sensorStore = useContext(UserStoreContext);
    return (
        <div>
            <h1>Temperature</h1>
            <XYPlot
                width={300}
                height={300}>
                <HorizontalGridLines />
                <LineSeries
                    color="red"
                    data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                    ]}/>
                <XAxis title="X" />
                <YAxis />
            </XYPlot>
        </div>
    );
};
