import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))   //add item in cart
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))  //if item is already into cart item
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))  //remove item from cart
    }

    useEffect(() => {
        console.log(cartItem);
    }, [cartItem])

    const contextValue = {
        food_list,
        addToCart,
        setCartItems,
        cartItem,
        removeFromCart
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider >
    )
}

export default StoreContextProvider;