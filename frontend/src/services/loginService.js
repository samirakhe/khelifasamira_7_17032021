import axiosInstance from '../config/axios.config';


export const login = (email, password) => {
    
    return axiosInstance({

        method: "post",
        url:`/users/login`,
        data:{
          email,
          password,
        },
      })
     
}