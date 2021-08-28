import moment from "moment";

export const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD h:mm:ss');
};

export const setDateSecondsToZero = (date) => {
    return moment(date).format('YYYY-MM-DD h:mm:00');
};

export const formatDateForPicker = (date) => {
    return moment(date).format('YYYY-MM-DDTh:mm');
};
