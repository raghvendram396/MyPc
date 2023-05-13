import React from 'react';
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,title,price,image,rating,hiddenButton}) {
    const [{basket},dispatch]=useStateValue();
    var foo=[];
    for(var i=0;i<rating;i++)
    {
foo.push(i);
    }
    const removefromBasket=() => {
   dispatch({type: "REMOVE_FROM_BASKET",
   item: id
})
    }
    return (
        <div className="checkoutProduct">
    <img src={image} className="checkoutProduct_image" />
    <div className="checkoutProduct_info">
<p className="checkoutProduct_title">{title}</p>
<p className="checkoutProduct_price">
    <small>$</small>
    <strong>{price}</strong>
</p>
<div className="checkoutProduct_rating">
{foo.map((i) => <p>✨</p>)}
</div>
{!hiddenButton && <button onClick={removefromBasket}>Remove from basket</button>}

    </div>
        </div>
    )
}

export default CheckoutProduct
