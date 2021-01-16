import axios from "axios";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const baseUrl = "http://localhost:8080/api/";