import {useState} from 'react'

export default function useForm() {
    const inititalValues = {
        name: '',
        email : '',
        password : ''
    }
    const [values, setValues] = useState(inititalValues);
    const handleInput = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        });
    }


    return [values, handleInput];
}
