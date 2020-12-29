import { baseUrl } from '../backendConfig';
import axios from "axios";

export const getUsersProducts = async () => {
    try {
        let responseData = await axios.get(`${baseUrl}users/products`)
        return responseData;
    } catch (error) {
        throw ({ 'error': error });
    }
}

export const addProduct = async (body) => {
    try {
        let responseData = await axios.post(`${baseUrl}users/products`, body);
        return responseData;
    } catch (error) {
        throw ({'error': error});
    }
}

export const removeProduct = async (productId) => {
    try {
        let responseData = await axios.delete(`${baseUrl}users/products/${productId}`)
        return responseData;
    } catch (error) {
        throw ({'error': error});
    }
}

export const getAllProducts = async () => {
    try {
        let responseData = await axios.get(`${baseUrl}products`)
        return responseData;
    } catch (error) {
        throw ({'error': error});
    }
}