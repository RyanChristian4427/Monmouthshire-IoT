import axios from 'axios';
import { API_URL } from './util/secrets';

const url = `${API_URL}/sms`;

export const readNewmessage = () => {
    axios.get(url)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
}