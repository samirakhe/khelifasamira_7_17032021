import React, { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Post/Feed";
import FormPost from "../components/Post/FormPost";
import axiosInstance from "../config/axios.config";
import Auth from '../components/auth';

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
    setPosts(posts.filter(post => post.Postid !== postId))
    }

    const upPost = (postId, data) => {
        const postIndex = posts.findIndex(post => post.Postid === postId);
        const postsArray = [...posts]
        const findPost = postsArray[postIndex];
        findPost.title = data.title;
        findPost.texte = data.texte;

        postsArray[postIndex] = findPost;
        setPosts(postsArray)
    }


    return (
        <div className="main">
            <Auth userConnected={true}>
            <FormPost onPostCreated={postCreated} />
            </Auth>
            {posts.map((item) => (
                <Feed  upPost={upPost} delPost={delPost}  post={item} key={item.Postid} />
            ))}
           
        </div>
    );
};

export default Home;
