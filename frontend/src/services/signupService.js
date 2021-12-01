import axiosInstance from '../config/axios.config';


export const signup = (data) => {
    
    return axiosInstance({

        method: "post",
        url: `/users/signup`,
        data: {
            pseudo: data.pseudo,
            email: data.email,
            password: data.password,
        },
      })
     
}