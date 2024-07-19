import React from 'react';
import Header from '../Components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../redux/CartSlice';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const totalAmount = items.reduce((total, item) => total + item.price, 0);
  const handleCheckout = ()=>{
      alert("Order made successfully")
  }
  return (
    <>
      <Header />
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <div className="cart-product-list">
              {items.map((item) => (
                <div key={item._id} className="cart-product-card">
                  <img
                    src={`http://localhost:8080/${item.photo}`}
                    alt={item.name}
                    className="cart-product-image"
                  />
                  <div className="cart-product-details">
                    <h3><strong>{item.name}</strong></h3>
                    <p>{item.description.slice(0, 50)}...</p>
                    <p><strong>Price:</strong> ₹{item.price}</p>
                 
                    <button onClick={() => handleRemove(item._id)} className="remove-from-cart">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
