import React, { createContext, useState } from "react";
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

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }


    const contextValue = {
        food_list,
        addToCart,
        setCartItems,
        cartItem,
        removeFromCart,
        getTotalCartAmount
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider >
    )
}

export default StoreContextProvider;