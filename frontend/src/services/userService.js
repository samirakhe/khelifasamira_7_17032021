import axiosInstance from '../config/axios.config';



export const deletetheProfil = (Userid) => {
    
    return axiosInstance({

        method: "delete",
        url: `/users/${Userid}`,
      })
     
}