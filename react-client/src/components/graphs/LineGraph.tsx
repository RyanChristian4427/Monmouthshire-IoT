import React, {useState} from 'react';
import {HorizontalGridLines, LineMarkSeries, XAxis, XYPlot, YAxis,} from 'react-vis';
import {timeFormat, HintFormatter, HintType} from 'components/graphs/utility/HintFormatter';

import './Graphs.scss';


interface IProps {
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
    height: number;
    width: number;
}

export interface Hint {
    x: Date;
    y: number;
}

const defaultDate = '2019-11-27';

const xAxisFormat: React.FC<Date> = (time: Date) => {
    time = new Date(time);
    return (
        <tspan>
            <tspan x="0" dy="1em">{timeFormat(time)}</tspan>
        </tspan>
    );
};

export const LineGraph: React.FC<IProps> = (props: IProps) => {
    const [hint, setHint] = useState();
    const date1 = new Date('2019-11-27T14:30:00+00:00');
    const date2 = new Date('2019-11-27T15:00:00+00:00');
    const date3 = new Date('2019-11-27T15:30:00+00:00');
    const date4 = new Date('2019-11-27T16:00:00+00:00');
    const date5 = new Date('2019-11-27T16:30:00+00:00');
    const date6 = new Date('2019-11-27T17:00:00+00:00');

    return (
        <div>
            <h1>{props.title}</h1>
            <XYPlot
                width={props.width}
                height={props.height}
                margin={{right: 20}}>
                <HorizontalGridLines />
                <LineMarkSeries
                    color="red"
                    data={[
                        {x: date1, y: 10},
                        {x: date2, y: 5},
                        {x: date3, y: 15},
                        {x: date4, y: 2},
                        {x: date5, y: 18},
                        {x: date6, y: 20},
                    ]}
                    onValueMouseOver={(hint: Hint): void => setHint(hint)}
                    onSeriesMouseOut={(): void => setHint('')}
                />
                <LineMarkSeries
                    color="blue"
                    data={[
                        {x: date1, y: 9},
                        {x: date2, y: 6},
                        {x: date3, y: 12},
                        {x: date4, y: 7},
                        {x: date5, y: 13},
                        {x: date6, y: 24},
                    ]}
                    onValueMouseOver={(hint: Hint): void => setHint(hint)}
                    onSeriesMouseOut={(): void => setHint('')}
                />
                <XAxis title={props.xAxisTitle} tickFormat={xAxisFormat}/>
                <YAxis title={props.yAxisTitle} />
                {hint ? HintFormatter({values: hint, type: HintType.LineGraphDate}) : null}
            </XYPlot>
        </div>
    );
};
