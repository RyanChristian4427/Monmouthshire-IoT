import {
    NodeData,
    ProcessedData,
    ProcessedNodeData,
    ProcessedSensorData,
    RoomData,
    SensorData
} from 'models/Neo4J';
import {SensorDataStore, SensorDatax} from 'stores/SensorDataStore';


// Lasciate ogne speranza, voi ch'intrate
export const dataProcessor = (data: RoomData[] | null, sensorStore: SensorDataStore): void => {
    const processedDataObject: ProcessedData = sensorStore.dataList;
    if (data !== null) {
        data.forEach((roomData: RoomData) => {
            const roomObject: ProcessedSensorData = {
                motion: [],
                temperature: [],
                humidity: [],
                luminance: [],
            };
            roomData.sensorData.forEach((sensorData: SensorData) => {
                const tempNodeDataList: ProcessedNodeData[] = [];
                sensorData.nodeData.forEach((nodeData: NodeData) => {
                    const date = new Date(0);
                    date.setUTCSeconds(nodeData.timestamp.low);
                    const processedNodeData: ProcessedNodeData = {
                        value: nodeData.value,
                        timestamp: date
                    };
                    tempNodeDataList.push(processedNodeData);
                });
                if (sensorData.type === 'Motion') roomObject.motion = tempNodeDataList;
                else if (sensorData.type === 'Temperature') roomObject.temperature = tempNodeDataList;
                else if (sensorData.type === 'Relative Humidity') roomObject.humidity = tempNodeDataList;
                else if (sensorData.type === 'Luminance') roomObject.luminance = tempNodeDataList;
            });
            if (roomData.name === 'Kitchen') processedDataObject.kitchen = roomObject;
            else if (roomData.name === 'Bedroom') processedDataObject.bedroom = roomObject;
            else if (roomData.name === 'Bathroom') processedDataObject.bathroom = roomObject;
            else if (roomData.name === 'Living Room') processedDataObject.livingRoom = roomObject;
            else if (roomData.name === 'Exterior Door') processedDataObject.exteriorDoor = roomObject;
        });
        sensorStore.setData(processedDataObject);
    }
};

export const lightDataProcessor = (data: RoomData[], sensorStore: SensorDataStore, dataType: string): void => {
    const processedDataObject: SensorDatax[] = [];
    data.forEach((roomData: RoomData) => {
        const roomObject: any = {
            data: [],
        };
        roomData.sensorData.forEach((sensorData: SensorData) => {
            const tempNodeDataList: ProcessedNodeData[] = [];
            sensorData.nodeData.forEach((nodeData: NodeData) => {
                const date = new Date(0);
                date.setUTCSeconds(nodeData.timestamp.low);
                const processedNodeData: ProcessedNodeData = {
                    value: nodeData.value,
                    timestamp: date
                };
                tempNodeDataList.push(processedNodeData);
            });
            roomObject.data = tempNodeDataList;
        });
        processedDataObject.push({ roomName: roomData.name, data: roomObject.data});
    });
    if (dataType === 'Temperature') {
        sensorStore.setAllTemperatureData(processedDataObject);
    } else if (dataType === 'Humidity') {
        sensorStore.setAllHumidityData(processedDataObject);
    } else if (dataType === 'Luminance') {
        sensorStore.setAllLuminanceData(processedDataObject);
    }
};

