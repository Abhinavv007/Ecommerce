import React from 'react';
import Header from '../Components/Header';
import { useSelector } from 'react-redux';

function Orders() {
  const items = useSelector((state) => state.cart);

  return (
    <div>
      <Header />
      <div className="orders-container">
        <h2>Your Orders</h2>
        {items.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="order-card">
              <img src={`http://localhost:8080/${item.photo}`} alt={item.name} className="order-image" />
              <div className="order-details">
                <h3>{item.name}</h3>
                <p>{item.description.slice(0, 50)}...</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Order Status:</strong> {item.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
