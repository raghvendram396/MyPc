import React, { useEffect, useState } from "react";
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import memories from "./images/memories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import {getPosts} from "./actions/posts";

function App() {
  const classes=useStyles();
  const dispatch=useDispatch();
  const [current_id,setcurrent_id]=useState(0);
  useEffect(() => {                    // useEffect is very good way of dispathing an action from react component. useEffect runs func inside it when second parameter passed to it changes actually. Since we are using empty array so it will only once because content of empty array doesn't change after that.
  dispatch(getPosts());
  },[current_id,dispatch]);                // We are also passing current_id so that useEffect distaches getposts whenever current_id also ochanges.
  return (
    <Container maxwidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
         Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid xs={12} sm={7}>
       <Posts setcurrent_id={setcurrent_id}/>
          </Grid>
            <Grid xs={12} sm={4}>
            <Form current_id={current_id} setcurrent_id={setcurrent_id}/>
          </Grid>
        </Grid>
      </Container>
      </Grow>
    </Container>
  );
}

export default App;
