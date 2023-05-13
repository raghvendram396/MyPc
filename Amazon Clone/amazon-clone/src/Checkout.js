import React from 'react';
import SubTotal from './SubTotal';
import "./Checkout.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    const [{basket,user},dispatch]=useStateValue();
    return (
        <div className="checkout">
           <div className="checkout_left">
               <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img18/CBCC/wfm/card-info_desktop_wf-unrecnp.jpg"></img>
        <h3>Hello {user?.email}</h3>   {/* Actually we have added > this because may be as fetching user from firebase is asynchronous so it may take some time then if in a data layer or redux store if user is null then it will give error if we do user.email so ? does what if it is null then it simply doesn't give error it just handles it by printing nothing*/}
           <div className="checkout_title"><h1>Your Shopping Basket</h1>
           {basket.map((item) => <CheckoutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />)}
           </div>
           </div>
           <div className="checkout_right">
              <SubTotal />
           </div>
        </div>
    )
}

export default Checkout
