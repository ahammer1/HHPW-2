import React, { useEffect, useState } from 'react';
import { getOrders } from '../api/OrderData';

export default function TotalRevenuePage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const calculateTotalRevenue = () => {
    const totalRevenue = orders
      .filter((order) => order.orderStatusId === 0)
      .reduce((total, order) => total + order.items.reduce((product) => total + product.price, 0) + order.tip, 0);

    return totalRevenue;
  };

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error: {error.message}</div>;
  } else {
    content = (
      <div>
        <h1>Total Revenue Page</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <p>Total Revenue: ${calculateTotalRevenue()}</p>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}
