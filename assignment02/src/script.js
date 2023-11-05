import React, { useState, useEffect } from "react";
import './style.css'
import items from "./pokemon_cards.json"

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [viewCart, setViewCart] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const listItems = items.map((el) => (
        // PRODUCT
        <div class="row border-top border-bottom" key={el.cardID}>
            <div class="row main align-items-center">
                <div class="col">
                    <img id="card_image" class="img-fluid" src={el.cardImage} />
                </div>
                <div class="col">
                    <div id="card_name" class="row">{el.cardName}</div>
                    <div id="card_info" class="row">{el.set} - {el.collectionNumber}</div>
                    <div id="card_price" class="row">${el.price}</div>
                </div>
                <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    {howManyofThis(el.cardID)}{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
            </div>
        </div>
    ));

    const handleInputChange = (field, value) => {
        setCheckoutForm({
            ...checkoutForm,
            [field]: value
        });
    };

    const handleCheckoutSubmit = (e) => {
        //checkout(checkoutForm, `${checkoutForm.address}, ${checkoutForm.city}, ${checkoutForm.zip}, ${checkoutForm.country}`);
        setOrderComplete(true);
    };

    function howManyofThis(cardID) {
        let hmot = cart.filter((cartItem) => cartItem.cardID === cardID);
        return hmot.length;
    }

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let newQuantity = howManyofThis(el) - 1;
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.cardID !== el.cardID);
        setCart(hardCopy);
        for(let i = 0; i < newQuantity; i++){
            addToCart(el);
        }
    };

    const cartItems = cart.map((el) => (
        <div key={el.cardID}>
            <img class=
                "img-fluid" src={el.cardImage} width={150} />
            {el.title}
            ${el.price}
        </div>));

    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    const [checkoutForm, setCheckoutForm] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        creditCardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const cartView = (
        <div>
            {/* ... (items in cart) */}
            <h2>Checkout Information</h2>
            <form onSubmit={handleCheckoutSubmit}>
                <div>
                    <label htmlFor="fullName">Full Name </label>
                    <input
                        id="fullName"
                        type="text"
                        value={checkoutForm.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address </label>
                    <input
                        id="address"
                        type="text"
                        value={checkoutForm.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                    />
                </div>
                {/* ... other input fields for city, zip, country */}
                <div>
                    <label htmlFor="creditCardNumber">Credit Card Number</label>
                    <input
                        id="creditCardNumber"
                        type="text"
                        value={checkoutForm.creditCardNumber}
                        onChange={(e) => handleInputChange('creditCardNumber', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="expirationDate">Expiration Date </label>
                    <input
                        id="expirationDate"
                        type="text"
                        value={checkoutForm.expirationDate}
                        onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cvv">CVV </label>
                    <input
                        id="cvv"
                        type="text"
                        value={checkoutForm.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );

    const completeScreen = (
        <div>
            <h2>Here's your order!</h2>
            <div>
                <strong>Full Name: </strong> {checkoutForm.fullName}
            </div>
            <div>
                <strong>Address: </strong> {checkoutForm.address}
            </div>
            {/* ... Repeat for other fields like city, zip, country */}
            <div>
                <strong>Credit Card Number: </strong> {"********" + checkoutForm.creditCardNumber.substring(8)}
            </div>
            {/* ... Repeat for other fields like expiration date and CVV */}
            {/* List out the items in the cart along with the total */}
            <h3>Items: </h3>
            {cartItems}
            <p><strong>Total: </strong> ${cartTotal.toFixed(2)}</p>
            {/* Button to confirm the order */}
            <button onClick={console.log("confirmed")}>Confirm Order</button>
            {/* Button to go back and edit the checkout form */}
            <button onClick={() => setOrderComplete(false)}>Edit Order</button>
        </div>
    );

    return (
        <div>
            <button id="cart_button" onClick={() => setViewCart(!(viewCart || orderComplete))}>
                {(viewCart || orderComplete) ? 'Back to Shop' : 'View Cart'}
            </button>
            {
                orderComplete ? (
                    // Show review screen if the user is reviewing their order
                    completeScreen
                ) : viewCart ? (
                    // Cart view
                    <div className="row">
                        <div id="cart">
                            <h2>Cart</h2>
                            <p>Total: ${cartTotal}</p>
                            {cart.map((item) => (
                                <div class="checkout" key={item.cardID}>
                                    <img src={item.cardImage} alt={item.cardName} width={150} />
                                    <p>{item.cardName} - ${item.price}</p>
                                    {/* Display other cart item details */}
                                </div>
                            ))}
                        </div>
                        <div id="userInfo">
                            {cartView}
                        </div>
                    </div>
                ) : (
                    // Shop view
                    <div className="card">
                        <div className="row">
                            <div className="col-md-8 cart">
                                <div>{listItems}</div> {/* listItems is your mapped products */}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Shop;