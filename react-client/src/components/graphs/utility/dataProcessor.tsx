import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';


import {Node} from 'models/Neo4J';
import {RoomType} from 'models/Sensor';
import {SensorDataStoreContext} from 'stores/SensorDataStore';

interface IProps {
    dataSet: any,
}

export const DataProcessor: React.FC<IProps> = observer((props: IProps) => {
    const sensorDataStoreContext = useContext(SensorDataStoreContext);

    const process = () => {
        props.dataSet.forEach((node: Node) => {
            switch (node.roomType) {
                case(RoomType.kitchen):
                    sensorDataStoreContext.kitchenDataList.push(node);
                    break;
                case(RoomType.bedroom):
                    sensorDataStoreContext.bedroomDataList.push(node);
                    break;
                case(RoomType.bathroom):
                    sensorDataStoreContext.bathroomDataList.push(node);
                    break;
                case(RoomType.livingRoom):
                    sensorDataStoreContext.livingRoomDataList.push(node);
                    break;
                case(RoomType.exteriorDoor):
                    sensorDataStoreContext.exteriorDoorDataList.push(node);
                    break;
            }
        });
    };

    return (
        <div/>
    )
});
