import React, { useState, useEffect } from "react";
import './style.css'
import items from "./pokemon_cards.json"

const CardShop = () => {
    // --------------------------------- SCREEN USESTATES ---------------------------------

    const [cards, setCards] = useState(items);
    const [viewCart, setViewCart] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // ------------------------------------------------------------------------------------

    // ---------------------------------- CART USESTATES ----------------------------------

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    // ------------------------------------------------------------------------------------





    // ---------------------------------- CART FUNCTIONS ----------------------------------

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.cardID !== el.cardID);
        setCart(hardCopy);
    };

    // ------------------------------------------------------------------------------------

    // -------------------------------- CHECKOUT FUNCTIONS --------------------------------

    const [checkoutForm, setCheckoutForm] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        creditCardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const resetUserInfo = (e) => {
        setCheckoutForm({
            ...checkoutForm,
            fullName: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            creditCardNumber: '',
            expirationDate: '',
            cvv: ''
        });
    }

    // ------------------------------------------------------------------------------------

    // ----------------------------- CHECKOUT FORM FUNCTIONS ------------------------------



    // ------------------------------------------------------------------------------------

    // -------------------------------- SCREENS FUNCTIONS ---------------------------------

    const listCards = (cards) => {
        return <div class="album py-2 bg-white">
            <div class="container-fluid">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3">
                    {cards.map((card) => (
                        <div class="col-md-4" id={card.cardID}>
                            <div class="card box-shadow">
                                <img src={card.cardImage} alt={card.cardName} class="Pokemon-card-picture"/>
                                <div class="card-body">
                                    <h1 id="card_name">{card.cardName}</h1>
                                    <h2 id="card_info">{card.set} - {card.collectionNumber}</h2>
                                    <div class="d-flex justify-content-between align-items-center"></div>
                                    <div class="changing_cart">
                                        <button type="button" variant="light" onClick={() => removeFromCart(card)} > - </button>{" "}
                                        {howManyofThis(card.cardID)} {" x $"}{card.price} {" "}
                                        <button type="button" variant="light" onClick={() => addToCart(card)}> + </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    };

    // ------------------------------------------------------------------------------------

    const handleFieldChange = (field, value) => {
        setCheckoutForm({
            ...checkoutForm,
            [field]: value
        });
    };

    const handleCheckoutSubmit = (e) => {
        setViewCart(false);
        setOrderComplete(true);
    };

    function howManyofThis(cardID) {
        let hmot = cart.filter((cartItem) => cartItem.cardID === cardID);
        return hmot.length;
    }

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
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email </label>
                    <input
                        id="email"
                        type="email"
                        
                        value={checkoutForm.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address </label>
                    <input
                        id="address"
                        type="text"
                        value={checkoutForm.address}
                        onChange={(e) => handleFieldChange('address', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City </label>
                    <input
                        id="city"
                        type="text"
                        value={checkoutForm.city}
                        onChange={(e) => handleFieldChange('city', e.target.value)}
                        required
                    />
                    <label id="stateLabel" htmlFor="state">State </label>
                    <select
                        id="state"
                        name="state"
                        value={checkoutForm.state}
                        onChange={(e) => handleFieldChange('state', e.target.value)}
                        required
                    >
                        <option value="AK">AK</option>
                        <option value="AL">AL</option>
                        <option value="AR">AR</option>
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="IA">IA</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="MA">MA</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="NE">NE</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VA">VA</option>
                        <option value="VT">VT</option>
                        <option value="WA">WA</option>
                        <option value="WI">WI</option>
                        <option value="WV">WV</option>
                        <option value="WY">WY</option>
                    </select>
                    <label id="zipLabel" htmlFor="zip">Zip Code </label>
                    <input
                        id="zip"
                        type="text"
                        minlength="5" 
                        maxlength="5"
                        pattern="^\d{5}$"
                        value={checkoutForm.zip}
                        onChange={(e) => handleFieldChange('zip', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="creditCardNumber">Credit Card Number</label>
                    <input
                        id="creditCardNumber"
                        type="text"
                        minlength="16" 
                        maxlength="16"
                        pattern="^\d{16}$"
                        value={checkoutForm.creditCardNumber}
                        onChange={(e) => handleFieldChange('creditCardNumber', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="expirationDate">Expiration Date </label>
                    <input
                        id="expirationDate"
                        type="text"
                        value={checkoutForm.expirationDate}
                        onChange={(e) => handleFieldChange('expirationDate', e.target.value)}
                        required
                    />
                    <label id="cvvLabel" htmlFor="cvv">CVV </label>
                    <input
                        id="cvv"
                        type="text"
                        value={checkoutForm.cvv}
                        onChange={(e) => handleFieldChange('cvv', e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );

    const completeScreen = (
        <div id="confirmation">
            <h2>Here's your order!</h2>
            <div>
                <strong>Full Name: </strong> {checkoutForm.fullName}
            </div>
            <div>
                <strong>Email: </strong> {checkoutForm.email}
            </div>
            <div>
                <strong>Address: </strong> {checkoutForm.address}<br></br>
                <div id="addLine2">{checkoutForm.city}, {checkoutForm.state} {checkoutForm.zip}</div>
            </div>
            {/* ... Repeat for other fields like city, zip, country */}
            <div>
                <strong>Credit Card Number: </strong> {"************" + checkoutForm.creditCardNumber.substring(12)}
            </div>
            {/* ... Repeat for other fields like expiration date and CVV */}
            {/* List out the items in the cart along with the total */}
            <div id="summary">
                <h3 class="finalOrder"><strong>Total: </strong> ${cartTotal.toFixed(2)}</h3>
                {cart.map((item) => (
                    <div class="finalOrder" key={item.cardID}>
                        <img src={item.cardImage} alt={item.cardName} width={150} />
                        <p>{item.cardName} - ${item.price}</p>
                        {/* Display other cart item details */}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            {
                orderComplete ? (
                    <div>
                        <button id="cart_button" onClick={() => {setCart([]); setCartTotal(0); resetUserInfo(); setOrderComplete(false)}}>
                            Shop Again
                        </button>
                        <div>
                            {completeScreen}
                        </div>
                    </div>
                ) : viewCart ? (
                    // Cart view
                    <div>
                        <button id="cart_button" onClick={() => {resetUserInfo(); setViewCart(false)}}>
                            Return
                        </button>
                        <div className="row">
                            <div id="cart">
                                <h2>Cart</h2>
                                <p>Total: ${cartTotal.toFixed(2)}</p>
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
                    </div>
                ) : (
                    // Shop view
                    <div>
                        <button id="cart_button" onClick={() => setViewCart(true)}>
                            View Cart
                        </button>
                        <div className="card border-0">
                            <div className="row">

                                    <div>{listCards(cards)}</div>

                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CardShop;