export const readingIsValid = (reading) => {
    const validEvents = ['Temperature', 'Luminance', 'Relative Humidity', 'Ultraviolet', 'Home Security'];
    return validEvents.indexOf(reading['label']) > -1;
};

export const fahrenheitToCelsius = (temp) => {
    return ((temp - 32) * 5) / 9;
};

