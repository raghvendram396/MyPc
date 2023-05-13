import axios from "axios";  // This module is used to make api calls
const url="http://localhost:5000/posts";   // This is url for our backend from where we will call

export const fetchPosts=() => axios.get(url);

export const createPost=(newPost) => axios.post(url,newPost);
export const updatedPost=(id,updatedPost) => axios.patch(`${url}/${id}`,updatedPost); 
export const deletePost=(id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);