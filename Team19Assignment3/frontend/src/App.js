import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const POST = () => {
  const [productInformation, setProductInformation] = useState({
    stateTitle: '',
    statePrice: null,
    stateDescription: '',
    stateCategory: '',
    stateImage: 'http://localhost:8081/images/',
    stateRate: null,
    stateCount: null,
  });

  function resetStateInformation() {
    setProductInformation({
        ...productInformation,
        stateTitle: '',
        statePrice: null,
        stateDescription: '',
        stateCategory: '',
        stateImage: 'http://localhost:8081/images/',
        stateRate: null,
        stateCount: null,
    });
  }

  function handleFieldChangeAdd(field, value) {
    setProductInformation({
      ...productInformation,
      [field]: value
    });
  }

  async function addProduct() {
    if(productInformation.stateTitle !== '' &&
       productInformation.statePrice !== null &&
       productInformation.stateDescription !== '' &&
       productInformation.stateCategory !== '' &&
       productInformation.stateImage !== '' &&
       productInformation.stateRate !== null &&
       productInformation.stateCount !== null) {

      const newProductJSON = JSON.stringify({
        "title": productInformation.stateTitle,
        "price": productInformation.statePrice,
        "description": productInformation.stateDescription,
        "category": productInformation.stateCategory,
        "image": productInformation.stateImage,
        "rating":{
          "rate": productInformation.stateRate,
          "count": productInformation.stateCount
        }
      })

      console.log(newProductJSON);

      await fetch('http://localhost:8081/add_product', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: newProductJSON
      })
          .then(response => response.json)
          .then(product => {
              console.log(product);
          })

      resetStateInformation();
      window.location.reload();
    }
  }
  
  return (
    <div>
      <div id="formInfo">
        <div class="formInfoIndividual">
          <label htmlFor="stateTitle">Product Title </label>
          <input
            id="stateTitle"
            type="text"
            size="40"
            style={{marginTop: '10px', marginLeft: '5px', fontSize: '18px'}}
            value={productInformation.stateTitle}
            onChange={(e) => handleFieldChangeAdd('stateTitle', e.target.value)}
            required
          />
        </div>
        <div class="formInfoIndividual">
          <label htmlFor="statePrice">Price of Product </label>
          <input
            id="statePrice"
            type="number"
            style={{marginLeft: '5px', fontSize: '18px'}}
            value={productInformation.statePrice}
            onChange={(e) => handleFieldChangeAdd('statePrice', e.target.value)}
            required
          />
        </div>
        <div class="formInfoIndividual">
          <label htmlFor="stateDescription">Describe the Product </label>
          <input
            id="stateDescription"
            type="text"
            size="100"
            style={{marginLeft: '5px', fontSize: '18px'}}
            value={productInformation.stateDescription}
            onChange={(e) => handleFieldChangeAdd('stateDescription', e.target.value)}
            required
          />
        </div>
        <div class="formInfoIndividual">
          <label htmlFor="stateCategory">Product's Category </label>
          <input
            id="stateCategory"
            type="text"
            size="30"
            style={{marginLeft: '5px', fontSize: '18px'}}
            value={productInformation.stateCategory}
            onChange={(e) => handleFieldChangeAdd('stateCategory', e.target.value)}
            required
          />
        </div>
        <div class="formInfoIndividual">
          <label htmlFor="stateImage">Image (just insert the filename) </label>
          <input
            id="stateImage"
            type="url"
            size="50"
            style={{marginLeft: '5px', fontSize: '18px'}}
            value={productInformation.stateImage}
            onChange={(e) => handleFieldChangeAdd('stateImage', e.target.value)}
            required
          />
        </div>
        <div class="formInfoIndividual">
          <label htmlFor="stateRate">Product's Rating </label>
          <input
            id="stateRate"
            type="number"
            value={productInformation.stateRate}
            onChange={(e) => handleFieldChangeAdd('stateRate', e.target.value)}
            required
          />
        </div>
        <div class="formInfoIndividual">
          <label htmlFor="stateCount">Number of Ratings </label>
          <input
            id="stateCount"
            type="number"
            style={{marginLeft: '5px', fontSize: '18px'}}
            value={productInformation.stateCount}
            onChange={(e) => handleFieldChangeAdd('stateCount', e.target.value)}
            required
          />
        </div>
        <button id="addProduct" onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
}

const GET = () => {
  fetch('http://localhost:8081/fakestore_catalog')
    .then(response => response.json())
    .then(fakestore_catalog => {
      console.log(fakestore_catalog);

      // Get the container that will hold all the products
      var productsContainer = document.getElementById("getProductsContainer");
            
      // Populate each card
      for(let i = 0; i < fakestore_catalog.length; i++) {
        let individualProduct = document.createElement("div");
        individualProduct.className = "individualProduct";

          let productTitle = document.createElement("h1");
            productTitle.className = "productTitle";
            productTitle.innerText = fakestore_catalog[i].title;
          individualProduct.appendChild(productTitle);

          let productImage = document.createElement("img");
            productImage.className = "productImage";
            productImage.src = fakestore_catalog[i].image;
          individualProduct.appendChild(productImage);

          let productCategory = document.createElement("h2");
            productCategory.className = "productCategory";
            productCategory.innerText = `Category: ${fakestore_catalog[i].category}`;
          individualProduct.appendChild(productCategory);

          let productDescription = document.createElement("h2");
            productDescription.className = "productDescription";
            productDescription.innerText = fakestore_catalog[i].description;
          individualProduct.appendChild(productDescription);

          let priceAndRating = document.createElement("div");
            let productPrice = document.createElement("h2");
              productPrice.className = "productPrice";
              productPrice.innerText = `Price: $${fakestore_catalog[i].price}`;
            priceAndRating.appendChild(productPrice);

            let productRating = document.createElement("h2");
              productRating.className = "productRating";
              productRating.innerText = `Rating: ${fakestore_catalog[i].rating.rate}/5.0 (${fakestore_catalog[i].rating.count})`
            priceAndRating.appendChild(productRating);
          individualProduct.appendChild(priceAndRating);
                    
        productsContainer.appendChild(individualProduct);
      }
    });

  return (
    <div>
      <div id="getProductsContainer">
      </div>
    </div>
  );
}

const PUT = () => {
  return (
    <div>
      <p>PUT PAGE</p>
    </div>
  );
}

const DELETE = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    productsForDelete();
    if(products.length > 0) {
      populateProduct();
    }
  }, []);

  useEffect(() => {
    if(products.length > 0) {
      populateProduct();
    }
  }, [index]);

  function hideShowButton() {
    if(products.length > 0) {
      let showButtonDiv = document.getElementById("showButtonDiv");
      showButtonDiv.hidden = true;
      populateProduct();
    }
  }

  async function productsForDelete() {
    await fetch('http://localhost:8081/fakestore_catalog')
    .then(response => response.json())
    .then(fakestore_catalog => {
      console.log(fakestore_catalog);
      setProducts(fakestore_catalog);
    });
  }

  function populateProduct() {
    let productDetails = document.getElementById("productDetails");
    productDetails.removeAttribute("hidden");

    let deleteTitle = document.getElementById("deleteTitle");
    deleteTitle.innerText = products[index].title;

    let deleteImage = document.getElementById("deleteImage");
    deleteImage.src = products[index].image;

    let deleteCategory = document.getElementById("deleteCategory");
    deleteCategory.innerText = `Category: ${products[index].category}`;

    let deleteDescription = document.getElementById("deleteDescription");
    deleteDescription.innerText = products[index].description;

    let deletePrice = document.getElementById("deletePrice");
    deletePrice.innerText = `Price: $${products[index].price}`;

    let deleteRating = document.getElementById("deleteRating");
    deleteRating.innerText = `Rating: ${products[index].rating.rate}/5.0 (${products[index].rating.count})`
  }

function getNextForDelete() {
  if (products.length > 0) {
    if (index === products.length - 1) setIndex(0);
    else setIndex(index + 1);
  }
}
    
function getPreviousForDelete() {
  if (products.length > 0) {
    if (index === 0) setIndex(products.length - 1);
    else setIndex(index - 1);
  }
}

async function deleteOneProduct() {
  let deleteConfirmation = "You are about to delete the following product:\n\n" + products[index].title;

  if(window.confirm(deleteConfirmation) == true) {
    console.log("Product to delete: ", products[index].title);
    
    await fetch('http://localhost:8081/delete_product', {
      method: "DELETE",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({"title": products[index].title})
    })
      .then(response => {response.json()})
      .then(deletedProduct => {console.log(deletedProduct)})
      .catch((err) => console.log("Error: " + err));
    
    if(products.length > 1) {
      setIndex(0);
    }
    window.location.reload();
  }
}

  return (
    <div>
      <div id="productDetails" hidden>
        <h1 id="deleteTitle" class="productTitle"></h1>
        <img id="deleteImage" class="productImage"></img>
        <h2 id="deleteCategory" class="productCategory"></h2>
        <h2 id="deleteDescription" class="productDescription"></h2>
        <div id="deletePriceAndRating" class="priceAndRating">
          <h2 id="deletePrice" class="productPrice"></h2>
          <h2 id="deleteRating" class="productRating"></h2>
        </div>
        <p></p>
      </div>
      <div id="showButtonDiv">
        <button id="showDeleteProduct" class="showButton" onClick={hideShowButton}>SHOW PRODUCTS</button>
      </div>
      <div id="deleteButtons">
        <button id="decreaseIndex" class="indexButton" onClick={getPreviousForDelete}>Prev</button>
        <button id="deleteProduct" class="deleteButton" onClick={deleteOneProduct}>DELETE</button>
        <button id="increaseIndex" class="indexButton" onClick={getNextForDelete}>Next</button>
      </div>
    </div>
  );
}

const ABOUT = () => {
  return (
    <div>
      <div id="aboutGeneral">
        <h1 id="aboutTitle">SE/Com S 319 Construction of User Interfaces<br></br>Fall 2023</h1>
        <h2 id="aboutDate">December 10th, 2023</h2>
      </div>
      <p id="aboutParagraph">This webpage is Aren and Eli's work for Assignment 3 in the SE/Com S 319 class.<br></br>The goal of this assignment is to use CRUD funcitonality to interact with a MongoDB database.<br></br>Additionally, this is our first attempt at implementing a navigation bar with Routing and a SINGLE webpage.<br></br>This datbase consists of items from the "Fakestore Database" which holds a variety of consumer items in multiple categories.<br></br>We can see all those items, create a new item, delete an item, and modify any field of each item!</p>
      <span id="allPeople">
        <div class="aboutInfo" id="ArenInfo">
          <p class="personName">Aren Ashlock</p>
          <p>Email: aashlock@iastate.edu</p>
        </div>
        <div class="aboutInfo" id="EliInfo">
          <p class="personName">Eli Newland</p>
          <p>Email: newland2@iastate.edu</p>
        </div>
        <div class="aboutInfo" id="AldacoInfo">
          <p class="personName">Dr. Abraham N. Aldaco Gastelum</p>
          <p>Email: aaldaco@iastate.edu</p>
        </div>
      </span>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav id="navBar">
            <button class="navButton">
              <Link to="/post">CREATE</Link>
            </button>
            <button class="navButton">
              <Link to="/get">GET ALL PRODUCTS</Link>
              </button>
            <button class="navButton">
              <Link to="/put">UPDATE</Link>
              </button>
            <button class="navButton">
              <Link to="/delete">DELETE</Link>
              </button>
            <button class="navButton">
              <Link to="/about">ABOUT THE TEAM</Link>
            </button>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/post" element={<POST />} />
          <Route path="/get" element={<GET />} />
          <Route path="/put" element={<PUT />} />
          <Route path="/delete" element={<DELETE />} />
          <Route path="/about" element={<ABOUT />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;