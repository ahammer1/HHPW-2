import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import {
  getOrderStatus, getPayments,
} from '../api/PaymentData';
import { updateOrder } from '../api/OrderData';

const initialState = {
  StatusId: 0,
  paymentTypesId: 0,
  tip: '',
  review: '',
};

export default function CloseOrder({ orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [availablePaymentTypes, setAvailablePaymentTypes] = useState([]);

  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    if (orderObj.orderId) setFormInput(orderObj);
    getOrderStatus([]).then(setAvailableStatuses);
    getPayments().then(setAvailablePaymentTypes);
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseOrder = (e) => {
    e.preventDefault();

    const updatedOrder = {
      StatusId: formInput.StatusId,
      paymentTypeId: formInput.paymentTypesId,
    };

    updateOrder(orderId, updatedOrder)
      .then(() => router.push('/'));
  };

  return (
    <div>
      <h1>Check Out</h1>
      <Form>
        <Form.Group controlId="paymentType">
          <Form.Label>Payment Type</Form.Label>
          <Form.Select
            aria-label="Payment Type"
            name="paymentType"
            onChange={handleChange}
            value={orderObj.paymentTypesId}
            required
          >
            <option value="">Select a payment type</option>
            {availablePaymentTypes.map((paymentTypes) => (
              <option key={paymentTypes.id} value={paymentTypes.id}>
                {paymentTypes.type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Label>Order Status</Form.Label>
          <Form.Select
            aria-label="Status"
            name="Status"
            onChange={handleChange}
            value={orderObj.StatusId}
            required
          >
            <option value="">Select an order status</option>
            {availableStatuses.map((Status) => (
              <option key={Status.id} value={Status.id}>
                {Status.Status}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formGridContent">
          <Form.Label>Enter Tip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tip"
            name="tip"
            value={formInput.tip}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGridContent">
          <Form.Label>Enter Review</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Review"
            name="review"
            value={formInput.review}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCloseOrder}>
          Enjoy!
        </Button>
      </Form>
    </div>
  );
}

CloseOrder.propTypes = {
  orderObj: PropTypes.shape({
    orderId: PropTypes.number,
    paymentTypesId: PropTypes.number,
    StatusId: PropTypes.number,
    tip: PropTypes.string,
    review: PropTypes.string,
  }),
};
CloseOrder.defaultProps = {
  orderObj: initialState,
};
