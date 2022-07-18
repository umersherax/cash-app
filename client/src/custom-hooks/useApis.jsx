import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import { baseUrl } from '../common/constants';

export default function useApis(values) {
    const navigate = useNavigate();
    const [error, setError]   = useState(false);
    const submit = (form,e) => {

        e.preventDefault();
        const {name, email , password} = values;
        if(form === 'register'){
            if(!name || !email || !password){
                setError(true);
                return;
            }
        }
        else{
            if(!email || !password){
                setError(true);
                return;
            }
        }
        setError(false);
        postData(form);
    }

    const baseRequest = async (request) => {
        const {token, route} = request;
        const fullUrl = `${baseUrl}${route}`;
        return await Axios.post(fullUrl,values,{
            headers: {
                'x-access-token': token || ''
            }
        });
    }


    async function postData(request){
        const res = await baseRequest(request);
        if(res.data.status === 'ok'){
            localStorage.setItem('token',res.data.newUser.token);
            localStorage.setItem('userId',res.data.newUser.user);
            localStorage.setItem('userName',res.data.newUser.userName);

            navigate('/dashboard');
        }else{
            alert('User not found');
        }
    }
    return [submit, error, postData, baseRequest];
}
