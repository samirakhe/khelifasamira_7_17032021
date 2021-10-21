import axios from "axios";

const instance =  axios.create();

const requestinterceptor = (config) => {
    console.log('Intercepteur de requetes appelé');
    const token = localStorage.getItem('token');
    config.headers['authorization'] = 'bearer ' + token;
    return config;

}

instance.interceptors.request.use(requestinterceptor);
instance.defaults.baseURL = `${process.env.REACT_APP_API_URL}api`;
instance.defaults.responseType = 'json';

export default instance;