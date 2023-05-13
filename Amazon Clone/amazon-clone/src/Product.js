import React from 'react'
import "./Product.css";
import { useStateValue } from './StateProvider';

function Product({id, title, price, image, rating}) {    // here we are destructuring a prop object
const [state,dispatch]=useStateValue();  // It is similar to useSelector and useDispatch in redux
//console.log("This is basket====",state.basket);
    var foo =[];
    const handleClick=() => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                price: price,
                image: image,
                rating: rating
            }
        })
    }
    for(var i=0;i<rating; i++)
    foo.push(i);
    function create(x)
    {return <p>✨</p>}
    return (
        <div className="product">
        <div className="product_info">
            <p>{title}</p>
        <p className="product_price">
            <small>Rs.</small>
            <strong>{price}</strong>
        </p> 
        <div className="product_rating">{foo.map(create)}</div>
     </div>
     <img src={image} className="product_image"></img>
     <button onClick={handleClick}>Add to Basket</button>
        </div>
    )
}

export default Product
