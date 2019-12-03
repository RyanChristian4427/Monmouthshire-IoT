import React from 'react';
import {Hint} from 'react-vis';

interface IProps {
    x: number | Date;
    y: number;
}

export const dateFormatter = (date: Date): string => {
    return ('00'+date.getHours()).slice(-2) + ':' + ('00'+date.getMinutes()).slice(-2);
};

export const HintFormatter: React.FC<IProps> = (props: IProps) => {

    const xFormat = (props.x instanceof Date)
        ? dateFormatter(props.x)
        : props.x;

    return (
        <Hint value={props}>
            <div className="rv-hint__content">
                <div>
                    <span className="rv-hint__title">x</span>
                    :
                    <span className="rv-hint__value"> {xFormat}</span>
                </div>
                <div>
                    <span className="rv-hint__title">y</span>
                    :
                    <span className="rv-hint__value"> {props.y}</span>
                </div>
            </div>
        </Hint>
    );
};
