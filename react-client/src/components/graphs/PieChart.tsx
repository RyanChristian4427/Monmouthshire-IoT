import React, {useEffect, useState} from 'react';
import {RadialChart} from 'react-vis';

import {colors} from 'components/graphs/utility/colors';
import {HintFormatter, HintType} from 'components/graphs/utility/HintFormatter';

import './Graphs.scss';


const testData = [{angle: 24, label: 'Kitchen'}, {angle: 33, label: 'Bedroom', color: ''}, {angle: 14, label: 'Bathroom'},
    {angle: 25, label: 'Living Room'}, {angle: 4, label: 'Front Door'}];

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

    useEffect(() => {
        testData.forEach((room, index) => {
            room.color = colors[index];
        });
    }, []);


    return (
        <div>
            <h3 className="is-size-3">{props.title}</h3>
            <RadialChart
                data={testData}
                width={props.width}
                height={props.height}
                colorType="literal"
                onValueMouseOver={(hint: Hint): void => setHint(hint)}
                onSeriesMouseOut={(): void => setHint('')}
            >
                {hint ? HintFormatter({values: hint, type: HintType.PieChart}) : null}
            </RadialChart>
        </div>
    );
};
