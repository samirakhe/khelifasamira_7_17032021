import React, { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Post/Feed";
import FormPost from "../components/Post/FormPost";
import axiosInstance from "../config/axios.config";

const Home = () => {
    const [posts, setPosts] = useState([]);
    

    const getPost = async () => {
        const source = axios.CancelToken.source();
        const response = await axiosInstance.get(`/posts`);
        console.log(response.data);
        setPosts(response.data);
    };
    useEffect(() => {
        getPost();
    }, []);

    const postCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };
   
    const delPost = (postId) => {
      setPosts(posts.filter(post => post.postId !== postId))
    }

    return (
        <div className="main">
            <FormPost onPostCreated={postCreated} />
            {posts.map((item) => (
                <Feed delPost={delPost}  post={item} key={item.Postid} />
            ))}
           
        </div>
    );
};

export default Home;
