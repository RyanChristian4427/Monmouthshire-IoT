"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SensorDataType;
(function (SensorDataType) {
    SensorDataType[SensorDataType["temperature"] = 0] = "temperature";
    SensorDataType[SensorDataType["luminance"] = 1] = "luminance";
    SensorDataType[SensorDataType["motion"] = 2] = "motion";
    SensorDataType[SensorDataType["ultraviolet"] = 3] = "ultraviolet";
    SensorDataType[SensorDataType["humidity"] = 4] = "humidity";
    SensorDataType[SensorDataType["electricFlow"] = 5] = "electricFlow";
})(SensorDataType = exports.SensorDataType || (exports.SensorDataType = {}));
var SensorHardwareType;
(function (SensorHardwareType) {
    SensorHardwareType["multiSensor"] = "multiSensor";
    SensorHardwareType["smartSwitch"] = "smartSwitch";
    SensorHardwareType["zStickGen5"] = "Z-Stick Gen5";
})(SensorHardwareType = exports.SensorHardwareType || (exports.SensorHardwareType = {}));
