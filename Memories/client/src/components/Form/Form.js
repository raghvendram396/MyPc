import React, { useState, useEffect } from "react";
import {TextField, Paper, Typography, Button} from "@material-ui/core";
import useStyles from "./styles";
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from "react-redux";
import { createPost ,updatePost} from "../../actions/posts";
function Form({current_id, setcurrent_id}) {                     // {} here we are destructing props object

    const [postData,setpostData]=useState({
        creator:"",
        title: "",
        message: "",
        tags: "",
        selectedFiles: "",
    });
    const classes=useStyles();
    const post=useSelector((state) => current_id ? state.posts.find((p)=> p._id===current_id): null);
    const dispatch=useDispatch();
    useEffect(() => {
        if(post) {setpostData(post);
        }
    },[post]);


    const clear=() =>{
        setcurrent_id(0);
        setpostData({creator: "",title: "", message: "", tags:"", selectedFiles: ""})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(current_id)                                  // so if current_id is not null then we are going to dispatch updatePost not createPost
        dispatch(updatePost(current_id, postData)); 
        else dispatch(createPost(postData));
        clear();      // After submit call clear function
    }

 
return <Paper className={classes.paper}>
<form autoComplete="off" noValidate className={'${classes.root} ${classes.form}'} onSubmit={handleSubmit}>
<Typography variant="h6" >{current_id ?"Editing" : "Creating"} a memory</Typography>
<TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(event) => setpostData({...postData, creator: event.target.value})}></TextField>
<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event) => setpostData({...postData, title: event.target.value})}></TextField>
<TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event) => setpostData({...postData, message: event.target.value})}></TextField>
<TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event) => setpostData({...postData, tags: event.target.value.split(',')})}></TextField>

<div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setpostData({ ...postData, selectedFile: base64 })} /></div>
<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="Submit" fullWidth>Submit</Button>
<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

</form>
</Paper>
}

export default Form;