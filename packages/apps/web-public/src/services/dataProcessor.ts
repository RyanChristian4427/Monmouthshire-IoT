import { RoomResponse, SensorDataResponse } from '@core/types';

import { RechartsSensorDataResponse } from 'routes/home';

const appendOrReplace = (
    dataArray: RechartsSensorDataResponse[],
    roomResponse: RoomResponse,
    sensorDataResponse: SensorDataResponse,
): void => {
    const dataPointToEditIndex = dataArray.findIndex((dataPoint) => dataPoint.time === sensorDataResponse.time);
    if (dataPointToEditIndex > -1) {
        dataArray[dataPointToEditIndex][roomResponse.roomName] = sensorDataResponse.value;
    } else {
        dataArray.push({
            time: sensorDataResponse.time,
            [roomResponse.roomName]: sensorDataResponse.value,
        });
    }
};

interface ProcessedData {
    temperatureDataArray: RechartsSensorDataResponse[];
    luminanceDataArray: RechartsSensorDataResponse[];
    motionDataArray: RechartsSensorDataResponse[];
    ultraVioletDataArray: RechartsSensorDataResponse[];
    humidityDataArray: RechartsSensorDataResponse[];
    electricFlowDataArray: RechartsSensorDataResponse[];
}

export const dataProcessor = (data: RoomResponse[]): ProcessedData => {
    const temperatureDataArray: RechartsSensorDataResponse[] = [];
    const luminanceDataArray: RechartsSensorDataResponse[] = [];
    const motionDataArray: RechartsSensorDataResponse[] = [];
    const ultraVioletDataArray: RechartsSensorDataResponse[] = [];
    const humidityDataArray: RechartsSensorDataResponse[] = [];
    const electricFlowDataArray: RechartsSensorDataResponse[] = [];

    data.map((roomResponse) => {
        roomResponse.temperature?.map((sensorDataResponse) => {
            appendOrReplace(temperatureDataArray, roomResponse, sensorDataResponse);
        });
        roomResponse?.luminance?.map((sensorDataResponse) => {
            appendOrReplace(luminanceDataArray, roomResponse, sensorDataResponse);
        });
        roomResponse.motion?.map((sensorDataResponse) => {
            appendOrReplace(motionDataArray, roomResponse, sensorDataResponse);
        });
        roomResponse.ultraviolet?.map((sensorDataResponse) => {
            appendOrReplace(ultraVioletDataArray, roomResponse, sensorDataResponse);
        });
        roomResponse.humidity?.map((sensorDataResponse) => {
            appendOrReplace(humidityDataArray, roomResponse, sensorDataResponse);
        });
        roomResponse.electricFlow?.map((sensorDataResponse) => {
            appendOrReplace(electricFlowDataArray, roomResponse, sensorDataResponse);
        });
    });

    return {
        temperatureDataArray,
        luminanceDataArray,
        motionDataArray,
        ultraVioletDataArray,
        humidityDataArray,
        electricFlowDataArray,
    };
};
