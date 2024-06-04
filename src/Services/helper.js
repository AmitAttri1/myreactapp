import axios from "axios";
export const BASE_URL="http://localhost:8085/Attendence/employee";

export const MyAxios=axios.create({
    baseURL:BASE_URL,
});
