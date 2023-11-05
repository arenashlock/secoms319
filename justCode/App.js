import './App.css';
import logo from './10_1_61_logo.png';
import React, { useState } from "react";
import { Products } from "./10_1_61_Products";
import { Categories } from "./10_1_61_Categories";

const render_products = (ProductsCategory) => {
  return <div className='category-section fixed'>
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
    <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
      maxHeight: '800px', overflowY:
        'scroll'
    }}>
      {/* Loop Products */}
      {ProductsCategory.map((product, index) => (
        <div key={index} className="group relative shadow-lg" >
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div class="card-body">
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-body-secondary">9 mins</small>
              </div>
            </div>
          </div>
        </div>
        </div>
  </div>


      ))}
    </div>
  </div>
}



const App = () => {
  console.log("Step 1 : load Products in a useState.");
  const [ProductsCategory, setProductsCategory] = useState(Products);
 
 
 
  return (
    // <div className="flex fixed flex-row">
    // <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
    // <img className="w-full" src={logo} alt="Sunset in the mountains" />
    // <div className="px-6 py-4">
    // <h1 className="text-3xl mb-2 font-bold text-white"> Product Catalog App </h1>
    // <p className="text-gray-700 text-white">
    // by - <b style={{ color: 'orange' }}>Design Shubham, Development Abraham</b>
    // </p>
    // <div className="py-10">
    // { (Categories) ? <p className='text-white'>Tags : </p> : ''}
    // {
    // Categories.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 
    // text-sm font-semibold text-gray-700 mr-2 mt-2" >{tag}</button>)
    // }
    // </div>
    // </div>
    // </div>
    <div className="ml-5 p-10 xl:basis-4/5">
    {console.log("Before render :",Products.length,ProductsCategory.length)}
    {render_products(ProductsCategory)}
    </div>
  //   </div>
   );
} // end App

export default App;
