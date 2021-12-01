import axiosInstance from '../config/axios.config';

export const postComment = (postId, texte) => {
    
    return axiosInstance({

        method: "post",
        url: `/commentaires`,
        data: {
            commentaire: texte,
            Postid: postId,
        },
      })
     
}
export const editComm = (Commentaireid, texte) => {
    
    return axiosInstance({

        method: "put",
        url: `/commentaires/${Commentaireid}`,

        data: {
            commentaire: texte,
        },
      })
     
}

export const deleteComm = (Commentaireid) => {
    
    return axiosInstance({

        method: "delete",
        url: `/commentaires/${Commentaireid}`
      })
     
}