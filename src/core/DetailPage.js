import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem } from './cartHelpers';
import "../styles.css";

const DetailsPage = ({
    product,
    showAddToCartButton = true,
    cartUpdate = true,
    setRun = f => f,
    run = undefined
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCartBtn = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn-card">
                    Add to cart
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
                <span className="badge badge-primary badge-pill">Out of Stock </span>
            );
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Add Qty</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };

    return (
        <div>
            <div className="small-container single-product">
                <div className="row">
                    <div className="col-4">
                        {shouldRedirect(redirect)}
                        <ShowImage item={product} url="product" />
                        <div className="small-img-row">
                            <div className="small-img-col">
                                <ShowImage item={product} url="product" />
                            </div>
                            <div className="small-img-col">
                                <ShowImage item={product} url="product" />
                            </div>
                            <div className="small-img-col">
                                <ShowImage item={product} url="product" />
                            </div>
                            <div className="small-img-col">
                                <ShowImage item={product} url="product" />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <p>Home / {product.category && product.category.name}</p>
                        <h2>{product.name}</h2>
                        <h4> Rs. {product.price}</h4>
                        {showStock(product.quantity)}
                        <br />

                        {showCartUpdateOptions(cartUpdate)}
                        {showAddToCartBtn(showAddToCartButton)}
                        <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                        <h3>Product Details <i class="fa fa-indent"></i></h3>
                        <br />
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
            <div className="small-container">
                <div className="row row-2">
                    <h2>Related Products</h2>
                    <p>view more</p>
                </div>
            </div>
        </div>

        // <div className="card ">
        //     <div className="card-header card-header-1 ">{product.name}</div>
        //     <div className="card-body">
        //         {shouldRedirect(redirect)}
        //         <ShowImage item={product} url="product" />
        //         <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
        //         <p className="card-p black-10">$ {product.price}</p>
        //         <p className="black-9">Category: {product.category && product.category.name}</p>
        //         <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
        //         {showStock(product.quantity)}
        //         <br />

        //         {showAddToCartBtn(showAddToCartButton)}

        //         {showCartUpdateOptions(cartUpdate)}
        //     </div>
        // </div>
    );
};

export default DetailsPage;
