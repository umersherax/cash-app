import Axios from 'axios';
import { baseUrl } from '../common/constants';

export const baseRequest = async (route) => {
    
    const fullUrl = `${baseUrl}${route}`;
    console.log(fullUrl)
    return await Axios.get(fullUrl,{
        headers: {
            'x-access-token': localStorage.getItem("token") || ''
        }
    });
}