import { baseUrl } from '../backendConfig';
import axios from "axios";

export const getUsersProducts = async () => {
    try {
        let responseData = await axios.get(`${baseUrl}users/products`)
        return responseData
    } catch (error) {
        throw ({ 'error': error })
    }
}