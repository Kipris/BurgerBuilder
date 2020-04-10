import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d89aa.firebaseio.com/'
});

export default instance;
