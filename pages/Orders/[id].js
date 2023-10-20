import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getOrderProducts, deleteProductOrders } from '../../api/PO';
import { getSingleOrder } from '../../api/OrderData';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [, setOrderInformation] = useState([]);
  // const [, setPayment] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const calculateTotalPrice = (data) => {
    let total = 0;
    data.forEach((order) => {
      total += order.price;
    });
    setTotalPrice(total);
  };

  const getProducts = () => {
    getOrderProducts(id).then((data) => {
      if (data) {
        setOrderDetails(data);
        calculateTotalPrice(data);
      }
    });
  };

  const handleDeleteItem = (itemId) => {
    deleteProductOrders(itemId, id)
      .then(() => {
        getProducts();
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  useEffect(() => {
    getSingleOrder(id).then(setOrderInformation);
  }, [id]);

  const handleCheckout = () => {
    router.push(`/closeForm?orderId=${id}`);
  };
  return (
    <>
      <h1>Orders Items</h1>
      <h2 className="card-title bold">Customer Name: {setOrderInformation.Name}</h2>
      {/* <p>payment type: {setPayment.paymentId}</p> */}
      <Button
        variant="dark"
        className="mr-2"
        onClick={() => router.push(`/addToOrder?orderId=${id}`)}
      >
        Add Item
      </Button>
      <div className="text-white my-5 details">
        <div className="mt-5 d-flex flex-wrap">
          {orderDetails.map((order) => (
            <div key={order?.id} className="text-white ms-5 details">
              <h1>Item Name: {order.name}</h1>
              <p>Price: {order.price}</p>
              <Button
                variant="dark"
                onClick={() => handleDeleteItem(order.id)}
              >
                Delete
              </Button>
              <hr />
            </div>
          ))}
        </div>
        <h3>Total Price: {totalPrice}</h3>
        {/* Add a button for checkout */}
        <Button
          variant="dark"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </>
  );
}
