import React from 'react';
import { XYPlot,
    XAxis, YAxis, HorizontalGridLines, LineSeries,} from 'react-vis';


interface IProps {
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
    height: number;
    width: number;
}

const defaultDate = '2019-11-27';

export const LineGraph: React.FC<IProps> = (props: IProps) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <XYPlot
                width={props.width}
                height={props.height}>
                <HorizontalGridLines />
                <LineSeries
                    color="red"
                    data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                    ]}
                />
                <LineSeries
                    color="blue"
                    data={[
                        {x: 1, y: 9},
                        {x: 2, y: 6},
                        {x: 3, y: 12}
                    ]}
                />
                <XAxis title={props.xAxisTitle} />
                <YAxis title={props.yAxisTitle} />
            </XYPlot>
        </div>
    );
};
