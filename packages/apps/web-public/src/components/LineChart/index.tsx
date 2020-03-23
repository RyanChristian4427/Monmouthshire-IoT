import { ComponentChild, FunctionalComponent, h } from 'preact';

import { RechartsSensorDataResponse } from 'models/Recharts';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DateTime } from 'luxon';

const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];

interface IProps {
    dataSet: RechartsSensorDataResponse[];
}

export const CustomLineChart: FunctionalComponent<IProps> = (props: IProps) => {
    const createLines = (): ComponentChild[] => {
        const lineArray: ComponentChild[] = [];
        let iterator = 0;
        for (const key in props.dataSet[0]) {
            if (Object.prototype.hasOwnProperty.call(props.dataSet[0], key)) {
                if (key !== 'time') {
                    lineArray.push(<Line type="monotone" dataKey={key} stroke={colors[iterator]} strokeWidth="2" />);
                    iterator = (iterator + 1) % 8;
                }
            }
        }
        return lineArray;
    };

    return (
        <ResponsiveContainer width="99%" height={300}>
            <LineChart data={props.dataSet} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {createLines()}
                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
                <Legend />
                <XAxis
                    dataKey="time"
                    tickFormatter={(timestamp): string =>
                        DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED)
                    }
                />
                <YAxis />
                <Tooltip
                    labelFormatter={(timestamp: string): string =>
                        DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED)
                    }
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
