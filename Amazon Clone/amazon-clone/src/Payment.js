import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import "./Payment.css";
import {Link} from "react-router-dom";
import { CardElement ,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from "./reducer";
import { useHistory } from 'react-router';
import axios from "./axios";
import {db} from "./firebase";

function Payment() {
    const [{basket,user},dispatch]=useStateValue();
    const stripe=useStripe();
    const elements=useElements();
    const [succeeded,setSuceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState(true);

    const history=useHistory();
    useEffect(() => {
        const getClientSecret= async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
           // Stripe excepts the total in currencies sub unit so if total is in dollar or rupees then conert to paisa or cents    
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    },[basket])
    console.log("The Secret is >>>", clientSecret);
    const handleSubmit=async (event) => {

        event.preventDefault();
        setProcessing(true);
        // some stripe functionality
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
            card: elements.getElement(CardElement)
            }
        })
        .then(({paymentIntent}) => {              // Here we are destructing response from stripe
            //paymentIntent is same as like paymentConfirmation lekin jo response se ata h stripe se usme yhi naam h

            db                                // We are basicslly going to users collection then in users collections searching for user with user.id then going to its orders collection and then adding its orders to database
            .collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
             basket: basket,
             amount: paymentIntent.amount,
             created: paymentIntent.created            // This tells at what time stamp it was created

            })
           setSuceeded(true);
             setProcessing(false);
             setError(null);
             dispatch({
                 type: "EMPTY_BASKET"
             })
             history.replace("/orders")      //  .replace not .push here because we don't want user to come agin on payment page aftyer payment send him to orders page (ek baar replce aur puh ke bare me padh lo)
        })
      

    }
    const handleChange=(event) => {
         // Listen to changes in the cardElement
         // and display any errors as the customer types their card details
         setDisabled(event.empty);
         setError(event.error ? event.error.message: "");
    }
    return (
        <div className="payment">
            <div className="payment_container">
           <h1> CheckOut ( 
               <Link to="/checkout">
                   {basket?.length} items
               </Link>
           )</h1>
                <div className="payment_section">
                    <div className="payment_title">
                     <h3>Delievery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 Rajapur</p>
                        <p>Prayagraj</p>
                    </div>
                </div>
                <div className="payment_section">
                  <div className="payment_title">
                    <h3>Review and delievery items</h3>
                  </div>
                  <div className="payment_items">
                      {basket.map((item) => <CheckoutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />)}
                  </div>
                </div>
                <div className="payment_section">
<div className="payment_title">
    <h3>Payment Method</h3>
</div>
<div className="payment_details">
    <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange}/>
        <div className="payment_priceContainer">
        <CurrencyFormat 
           renderText={(value) => (
            <>
               <h3>Order Total: {value}</h3>
               </>
            
           )}
           decimalScale={2}
           value={getBasketTotal(basket)}
           displayType={"text"}
           thousandSeparator={true}
           prefix={"$"}
       />
       
        <button disabled={processing || disabled || succeeded}>
            <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
        </button>
        {error && <div>{error}</div>} </div>
    </form>
</div>
                </div>
            </div>
        </div>
    )
}

export default Payment
