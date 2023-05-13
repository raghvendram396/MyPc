import React from "react";
import { useSelector } from "react-redux";
import {Grid, CircularProgress} from "@material-ui/core";
import Post from "./Post/Post.js";
import useStyles from "./styles";

function Posts({ setcurrent_id })                    // Here we are destructuring props
{ const classes=useStyles();
    const posts=useSelector((state) => state.posts);
   console.log(posts);                       
                           // CircularProgress means round circle which keeps rotating                       
    return ( 
     !posts.length ? <CircularProgress />:
         <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => 
                 <Grid key={post._id} item xs={12} sm={6}>
                <Post post={post} setcurrent_id={setcurrent_id}/>
                 </Grid> )}
         </Grid>
    );

}

export default Posts;