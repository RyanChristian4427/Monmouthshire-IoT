import React, {useState} from 'react';
import { HorizontalGridLines, Hint, LineMarkSeries, XYPlot, XAxis, YAxis,} from 'react-vis';


interface IProps {
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
    height: number;
    width: number;
}

const defaultDate = '2019-11-27';

export const LineGraph: React.FC<IProps> = (props: IProps) => {
    const [hint, setHint] = useState('');

    return (
        <div>
            <h1>{props.title}</h1>
            <XYPlot
                width={props.width}
                height={props.height}>
                <HorizontalGridLines />
                <LineMarkSeries
                    color="red"
                    data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                    ]}
                    onValueMouseOver={(hint: string) => setHint(hint)}
                    onSeriesMouseOut={() => setHint('')}
                />
                <LineMarkSeries
                    color="blue"
                    data={[
                        {x: 1, y: 9},
                        {x: 2, y: 6},
                        {x: 3, y: 12}
                    ]}
                    onValueMouseOver={(hint: string) => setHint(hint)}
                    onSeriesMouseOut={() => setHint('')}
                />
                <XAxis title={props.xAxisTitle} />
                <YAxis title={props.yAxisTitle} />
                {hint ? <Hint value={hint}/> : null}
            </XYPlot>
        </div>
    );
};
