import logger from './logger';

export const readingIsValid = (reading) => {
    const validEvents = ['Temperature', 'Luminance', 'Relative Humidity', 'Ultraviolet', 'Home Security'];
    return validEvents.indexOf(reading['label']) > -1;
};

export const fahrenheitToCelsius = (temp) => {
	const tempInC = (temp - 32) * 5 / 9;
	logger.error(`Have converted ${temp} F to ${tempInC} C`);
    return tempInC;
};

