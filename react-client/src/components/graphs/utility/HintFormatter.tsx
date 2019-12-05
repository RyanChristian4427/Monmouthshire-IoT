import React from 'react';
import {Hint} from 'react-vis';

interface IProps {
    values: CoordsType | RadialType;
    type: HintType;
}

export enum HintType {
    LineGraphDate,
    PieChart
}

export const timeFormat = (date: Date): string => {
    return ('00'+date.getHours()).slice(-2) + ':' + ('00'+date.getMinutes()).slice(-2);
};

interface CoordsType {
    x: Date;
    y: number;
}

const coordsHint: React.FC<CoordsType> = (props: CoordsType) => {
    return (
        <React.Fragment>
            <div>
                <span className="rv-hint__title">x</span>
                :
                <span className="rv-hint__value"> {timeFormat(props.x)}</span>
            </div>
            <div>
                <span className="rv-hint__title">y</span>
                :
                <span className="rv-hint__value"> {props.y}</span>
            </div>
        </React.Fragment>
    );
};

interface RadialType {
    radius: number;
    angle0: number;
    angle: number;
}

const calculatePercentage = (props: RadialType): string => {
    const {radius, angle0, angle} = props;
    const arcLength = Math.abs(Math.pow(radius, 2) * (angle0 - angle));
    const circleLength = Math.PI * 2 * radius;
    return (arcLength/circleLength * 100).toString();
};

const stringHint: React.FC<RadialType> = (props: RadialType) => {
    return (
        <React.Fragment>
            <div>
                <span className="rv-hint__title">{calculatePercentage(props)}</span>
            </div>
        </React.Fragment>
    );
};


export const HintFormatter: React.FC<IProps> = (props: IProps) => {
    const hintFormat = (): React.ReactNode => {
        switch(props.type) {
            case HintType.LineGraphDate:
                // Necessary ignores. TS can't tell that I am using an enum to type check prop.values
                // @ts-ignore
                return coordsHint(props.values);
            case HintType.PieChart:
                // @ts-ignore
                return stringHint(props.values);
        }
    };

    return (
        <Hint value={props.values}>
            <div className="rv-hint__content">
                {hintFormat()}
            </div>
        </Hint>
    );
};
