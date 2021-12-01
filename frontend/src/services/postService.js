import axiosInstance from '../config/axios.config';



//delete post from admin:
export const deletePost = (Postid) => {
    
    return axiosInstance({

        method: "delete",
        url: `/posts/admin/${Postid}`
      })
     
}

// delete poste from users:
export const deletethePost = (Postid) => {
    
    return axiosInstance({

        method: "delete",
        url: `/posts/${Postid}`,
      })
     
}

//LIKES

export const postLike = (postId) => {
    
    return axiosInstance({

        method: "post",
        url: `/likes`,

        data: {
            Postid : postId,
        },
      })
     
}

