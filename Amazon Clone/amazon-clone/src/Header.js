import React from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{basket,user}, dispatch ]=useStateValue();
    const handleAuthenticate=() => {
     auth.signOut();
    }
    return (
        <div style={{position: "sticky", top: "0", zIndex:100 }}>
            <div className="header">
            <Link to="/">
                <img className="header_logo" src="https://www.gizmochina.com/wp-content/uploads/2020/05/Amazon-Logo-Dark.jpg"></img>
                </Link><div className="header_search">
                    <input type="text" className="header_searchInput"></input>
                    <SearchIcon className="header_searchIcon"/>
                </div>
                <div className="header_nav">
                <Link to={!user && "/login"}>          {/* This means link to login route only when there is no user i.e no one is signed in*/}     
                    <div className="header_option" onClick={handleAuthenticate}>
                        <span className="header_optionLineOne">
                        {user ? "Hello "+user.email: "Hello Guest"}
                            
                        </span>
                        <span className="header_optionLineTwo">{user ? "Sign Out":"Sign In"}</span>
                    </div>
                    </Link>
                    <Link to="/orders">
                <div className="header_option">
                <span className="header_optionLineOne">
                            Return
                        </span>
                        <span className="header_optionLineTwo">& Orders</span>
                </div></Link>
                <div className="header_option">
                <span className="header_optionLineOne">
                            Your
                        </span>
                        <span className="header_optionLineTwo">Prime</span>
                </div>
                <Link to="/checkout">
                <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_BasketCount">
               {basket.length}
            </span>
                </div></Link></div>
            </div>
        </div>
    )
}

export default Header
