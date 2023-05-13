import React,{useState} from 'react'
import "./Login.css"
import {Link,useHistory} from "react-router-dom";
import { auth } from './firebase';

function Login() {
    const history=useHistory();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const signIn =(e) => {
        e.preventDefault();

        // Then here goes some code from firebase for signing in. 
        auth
        .signInWithEmailAndPassword(email,password)
        .then((auth) => {
            history.push("/");
        })
        .catch(error => alert(error.message))
    }
const register= (e) => {
    e.preventDefault();
    // Here some firebase register code
    auth.createUserWithEmailAndPassword(email,password)
    .then((auth) => {console.log(auth);
    if(auth)
{history.push("/")}  // this is similar to redirect in node.js
})
    .catch(error => alert(error.message))
}
    return (
        <div className="login">
            <Link to="/">
            <img src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" className="login_image"></img>
            </Link>
            <div className="login_container">
               <h1>Sign in</h1>
               <form>
                   <h5>Email</h5>
                   <input type="text" value={email} onChange={e => setemail(e.target.value)} />
                   <h5>Password</h5>
                   <input type="password" value={password} onChange={e => setpassword(e.target.value)}></input>
                   <button className="login_signinButton" type="submit" onClick={signIn}>Sign in</button>
               </form> 
               <p>By Signing in, you agree to all terms and conditions of Amazon-clone</p>
               <button onClick={register} className="login_registerButton">Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
