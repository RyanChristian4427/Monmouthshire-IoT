import React from 'react';
import {Square} from 'react-feather';

import {colors} from 'components/graphs/utility/colors';

import 'components/graphs/utility/Legend/Legend.scss';


export const Legend: React.FC = () => {
    const roomNameList = ['Kitchen', 'Bedroom', 'Bathroom', 'Living Room', 'Front Door'];

    return (
        <div className="legend-card level">
            {
                roomNameList.map((name, index) => {
                    return (
                        <div className="level-item" key={index}>
                            <p className="icon is-small">
                                <Square color={colors[index]} fill={colors[index]}/>
                            </p>
                            {name}
                        </div>
                    );
                })
            }
        </div>
    );
};
