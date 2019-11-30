const axios = require('axios');

const url = 'http://192.168.0.83:8000/api/v1/sms';

const readNewmessage = () => {
    setInterval(() => {
        axios.get(url)
        .then((response) => {
           console.log(response) 
        }) 
        .catch((err) => console.log(err));
    }, 60000) // checks every min for a new message
}

const processMessages = (response) => {
    for(i=0; i< response.length; i++){
        console.log(response[i])
    }
}