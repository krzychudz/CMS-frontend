import { baseUrl } from '../backendConfig';
import axios from "axios";

export const testApiCall = async () => {
    console.log(localStorage.getItem('userId'));
    let userId = localStorage.getItem('userId');
    try {
        let responseData = await axios.get(`${baseUrl}users/${userId}/products`)
        console.log(responseData.data);
        return responseData
    } catch (error) {
        throw ({ 'error': error })
    }
}