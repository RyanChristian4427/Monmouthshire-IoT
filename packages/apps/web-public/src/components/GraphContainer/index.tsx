import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import './style.scss';

interface IProps {
    childGraph: ComponentChild;
}

export const GraphContainer: FunctionalComponent<IProps> = (props: IProps) => {
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() - 7);
        return today;
    });
    const [dueDate, setDueDate] = useState(new Date());

    const zeroPad = (value: number): string => (value < 10 ? '0' : '') + value;

    return (
        <div class="graph-container is-flex">
            <div class="is-pulled-left container">
                Title
                {props.childGraph}
            </div>
            <div class="is-pulled-right">
                <div class="field">
                    <label class="label">Start Date</label>
                    <div class="control">
                        <input
                            type="date"
                            value={`${startDate.getFullYear().toString()}-${zeroPad(
                                startDate.getMonth() + 1,
                            )}-${zeroPad(startDate.getDate())}`}
                            onInput={(e): void => setStartDate(new Date((e.target as HTMLInputElement).value))}
                        />
                    </div>
                </div>
                <div class="field">
                    <label class="label">End Date</label>
                    <div class="control">
                        <input
                            type="date"
                            value={`${dueDate.getFullYear().toString()}-${zeroPad(dueDate.getMonth() + 1)}-${zeroPad(
                                dueDate.getDate(),
                            )}`}
                            onInput={(e): void => setDueDate(new Date((e.target as HTMLInputElement).value))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
