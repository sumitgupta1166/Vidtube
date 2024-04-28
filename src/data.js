
export const API_KEY="AIzaSyB7hLmas-5O88n2znuiN-6eaQ1cUY3CVYg";
export const value_converter = (value) => {
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M";
    } else if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
    } else {
        return value;
    }
};