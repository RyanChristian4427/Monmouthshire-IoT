import React, {useState} from 'react';
import {RadialChart} from 'react-vis';
import {HintFormatter, HintType} from 'components/graphs/utility/HintFormatter';

import './Graphs.scss';


const myData = [{angle: 24, label: 'Kitchen'}, {angle: 33, label: 'Bedroom'},
    {angle: 14, label: 'Bathroom'}, {angle: 25, label: 'Living Room'}, {angle: 4, label: 'Front Door'}];

interface IProps {
    title: string;
    height: number;
    width: number;
}

interface Hint {
    angle0: number;
    angle: number;
    color: number;
    label: string;
    radius0: number;
    radius: number;
    x: number;
    y: number;
}

export const PieChart: React.FC<IProps> = (props: IProps) => {
    const [hint, setHint] = useState();

    return (
        <div>
            <h1>{props.title}</h1>
            <RadialChart
                data={myData}
                width={props.width}
                height={props.height}
                showLabels
                showLabelsAboveChildren={false}
                onValueMouseOver={(hint: Hint): void => setHint(hint)}
                onSeriesMouseOut={(): void => setHint('')}
            >
                {hint ? HintFormatter({values: hint, type: HintType.PieChart}) : null}
            </RadialChart>
        </div>
    );
};
