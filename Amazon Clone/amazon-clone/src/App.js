import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login"
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Payment from "./Payment";
import Orders from "./Orders";
function App() {
  const promise=loadStripe("pk_test_51JF428SEixEbQ6LLus6cO66SpZKxWOBmsp6FGFk0GGqpGhBVUlGTESm62U2hjCNx9hByWTxGTfxWywU8dckqhl3900NWYdpR33")
  const [{},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("User is >>>", authUser);
      if(authUser) {                                                                      //user just logged in/ user was logged in
        dispatch({                       // So now if user is logged in and it refreshes the page then too it will set user to user who was logged in.
          type: "SET_USER",
          user: authUser
        })
      }
      else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  },[])
  return (
    <Router>
    <div className="app">
    
    <Switch>
    <Route path="/orders">
    <Header />
      <Orders />
    </Route>
    <Route path="/payment">
    <Header />
    <Elements stripe={promise}>
      <Payment />
    </Elements>
    </Route>
    <Route path="/login">
    <Login /> 
    </Route>
    <Route path="/checkout">
    <Header />
      <Checkout />
    </Route>
    <Route path="/">
    <Header />
     <Home />
    </Route>
     </Switch> 
    </div></Router> 
   
  );
}

export default App;
