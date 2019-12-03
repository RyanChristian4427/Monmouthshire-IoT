import {Node} from 'models/Neo4J';
import {RoomType} from 'models/Sensor';

const dataProcessor = (data: any): void => {
    const kitchenDataList = [];
    const bedroomDataList = [];
    const bathroomDataList = [];
    const livingRoomDataList = [];
    const exteriorDoorDataList = [];

    data.forEach((node: Node) => {
        switch(node.roomType){
            case(RoomType.kitchen):
                kitchenDataList.push(node);
                break;
            case(RoomType.bedroom):
                bedroomDataList.push(node);
                break;
            case(RoomType.bathroom):
                bathroomDataList.push(node);
                break;
            case(RoomType.livingRoom):
                livingRoomDataList.push(node);
                break;
            case(RoomType.exteriorDoor):
                exteriorDoorDataList.push(node);
                break;
        }
    });

};
