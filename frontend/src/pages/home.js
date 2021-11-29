import React, { useEffect, useState } from "react";
import Feed from "../components/Post/Feed";
import FormPost from "../components/Post/FormPost";
import axiosInstance from "../config/axios.config";
import Auth from "../components/auth";
import "./Pages.css";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const getPost = async () => {
        const response = await axiosInstance.get(`/posts`);
        setPosts(response.data);
    };
    useEffect(() => {
        getPost();
    }, []);

    const postCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const delPost = (postId) => {
        setPosts(posts.filter((post) => post.Postid !== postId));
    };

    const upPost = (postId, data) => {
        const postIndex = posts.findIndex((post) => post.Postid === postId);
        const postsArray = [...posts];
        const findPost = postsArray[postIndex];
        findPost.title = data.title;
        findPost.texte = data.texte;
        findPost.image = data.image;

        postsArray[postIndex] = findPost;
        setPosts(postsArray);
    };

    return (
        <div className="main">
            <Auth userConnected={true}>
                <FormPost onPostCreated={postCreated} />
            </Auth>
            {posts.map((item) => (
                <Feed
                    className="feed"
                    upPost={upPost}
                    delPost={delPost}
                    post={item}
                    key={item.Postid}
                />
            ))}
        </div>
    );
};

export default Home;
