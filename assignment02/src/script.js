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
    const [query, setQuery] = useState('');
    const [uniqueCart, setUniqueCart] = useState([]);

    // ------------------------------------------------------------------------------------





    // ---------------------------------- CART FUNCTIONS ----------------------------------

    const handleSearch = (e) => {
        setQuery(e.target.value);
        const results = items.filter(eachCard => {
            if (e.target.value === "") return cards;
            return eachCard.cardName.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setCards(results);
    }
    
    const addToCart = (el) => {
        setCart([...cart, el]);

        if(howManyofThis(el.cardID) === 0){
            addToUniqueCart(el);
        }
    };

    const addToUniqueCart = (el) => {
        setUniqueCart([...uniqueCart, el]);

    }

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy.splice(hardCopy.indexOf(el), 1);
        setCart(hardCopy);

        if(howManyofThis(el.cardID) === 1){
            removeFromUniqueCart(el);
        }
    };

    const removeFromUniqueCart = (el) => {
        let hardCopy = [...uniqueCart];
        hardCopy.splice(hardCopy.indexOf(el), 1);
        setUniqueCart(hardCopy);
    }

    function howManyofThis(cardID) {
        let hmot = cart.filter((cartItem) => cartItem.cardID === cardID);
        return hmot.length;
    }

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    useEffect(() => {
        total();
    }, [cart]);

    // ------------------------------------------------------------------------------------

    // -------------------------------- CHECKOUT FUNCTIONS --------------------------------

    const individualTotal = (quantity, cost) => {
        return quantity * cost;
    }
    
    const handleCheckoutSubmit = () => {
        setViewCart(false);
        setOrderComplete(true);
    };

    // ------------------------------------------------------------------------------------

    // ----------------------------- CHECKOUT FORM FUNCTIONS ------------------------------

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
    
    const handleFieldChange = (field, value) => {
        setCheckoutForm({
            ...checkoutForm,
            [field]: value
        });
    };

    // ------------------------------------------------------------------------------------

    // -------------------------------- SCREENS FUNCTIONS ---------------------------------

    const finalUserInformation = (
        <div id="confirmation">
            <div>
                <strong>Full Name:</strong> {checkoutForm.fullName}
            </div>
            <div>
                <strong>Email:</strong> {checkoutForm.email}
            </div>
            <div>
                <strong>Address:</strong> {checkoutForm.address}<br/>
                <div id="addLine2">{checkoutForm.city}, {checkoutForm.state} {checkoutForm.zip}</div>
            </div>
            <div>
                <strong>Credit Card Number: </strong> {"************" + checkoutForm.creditCardNumber.substring(12)}
            </div>
        </div>
    );

    const checkoutInfoInput = (
        <div id="userInfo">
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

    const cartItems = (uniqueCart) => {
        return <div className="card border-0">
            <div className="row">
                <div class="album py-2 bg-white">
                    <div class="container-fluid">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3">
                            {uniqueCart.map((card) => (
                                <div class="col-md-4" id={card.cardID}>
                                    <div class="card box-shadow">
                                        <img src={card.cardImage} alt={card.cardName} class="Pokemon-card-picture"/>
                                        <div class="card-body">
                                            <h1 id="card_name">{card.cardName}</h1>
                                            <h2 id="card_info">{card.set} - {card.collectionNumber}</h2>
                                            <div class="d-flex justify-content-between align-items-center"></div>
                                            <div class="changing_cart">
                                                {howManyofThis(card.cardID)} {" x $"}{card.price} {" = $"}{individualTotal(howManyofThis(card.cardID), card.price).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };

    const listCards = (cards) => {
        return <div className="card border-0">
            <div className="row">
                <div class="album py-2 bg-white">
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
            </div>
        </div>
    };

    // ------------------------------------------------------------------------------------

    // -------------------------------------- HTML ----------------------------------------

    return (
        <div>
            {
                orderComplete ? (
                    // Confirmation view
                    <div>
                        <button class="page_button" onClick={() => {setCart([]); setCartTotal(0); setUniqueCart([]); resetUserInfo(); setOrderComplete(false)}}>
                            Shop Again
                        </button>
                        <div>
                            <h1>Here's your order!</h1>
                            {finalUserInformation}
                        </div>
                        <h2>Total: ${cartTotal.toFixed(2)}</h2>
                        {cartItems(uniqueCart)}
                    </div>
                ) : viewCart ? (
                    // Cart view
                    <div>
                        <button class="page_button" onClick={() => {resetUserInfo(); setViewCart(false)}}>
                            Return
                        </button>
                        <div>
                            <h1>Checkout Information</h1>
                            {checkoutInfoInput}
                        </div>
                        <h2>Total: ${cartTotal.toFixed(2)}</h2>
                        {cartItems(uniqueCart)}
                    </div>
                ) : (
                    // Card Shop view
                    <div>
                        <div>
                            <input id="searchbar" type="search" value={query} onChange={handleSearch} />
                            <button class="page_button" onClick={() => setViewCart(true)}>
                                View Cart
                            </button>
                        </div>
                        <div>{listCards(cards)}</div>
                    </div>
                )
            }
        </div>
    );

    // ------------------------------------------------------------------------------------
};

export default CardShop;