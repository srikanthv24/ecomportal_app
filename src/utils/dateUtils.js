import moment from "moment";
export const getMinDateAsToday = () => moment().format("YYYY-MM-DD");

export const getCustomMinDate = () => moment().format("YYYY-MM-DD");