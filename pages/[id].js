import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import {
  getOrderStatus, getPayments,
} from '../api/PaymentData';
import { closeOrder, getSingleOrder } from '../api/OrderData';

const initialState = {
  statusId: '',
  paymentTypesId: '',
  tip: '',
  review: '',
};

export default function CloseOrder() {
  const [formInput, setFormInput] = useState(initialState);
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [availablePaymentTypes, setAvailablePaymentTypes] = useState([]);
  const [orderObj, setOrderObj] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrderObj);
  }, [id]);

  useEffect(() => {
    if (orderObj) setFormInput(orderObj);
    getOrderStatus().then(setAvailableStatuses);
    getPayments().then(setAvailablePaymentTypes);
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(id, formInput);
  console.log(orderObj);

  const handleCloseOrder = (e) => {
    e.preventDefault();
    const payload = formInput;
    closeOrder(payload, id).then(() => {
      router.push('/');
    });
  };

  return (
    <div>
      <h1>Check Out</h1>
      <Form>
        <Form.Group controlId="paymentTypesId">
          <Form.Label>Payment Type</Form.Label>
          <Form.Select
            aria-label="Payment Type"
            name="paymentTypesId"
            onChange={handleChange}
            value={formInput.paymentTypesId}
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
            aria-label="status"
            name="Status"
            onChange={handleChange}
            value={formInput.statusId}
            required
          >
            <option value="">Select an order status</option>
            {availableStatuses.map((Status) => (
              <option key={Status.id} value={Status.id}>
                {Status.status}
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
    orderid: PropTypes.number,
    paymentTypesId: PropTypes.string,
    statusId: PropTypes.string,
    tip: PropTypes.string,
    review: PropTypes.string,
  }),
};
CloseOrder.defaultProps = {
  orderObj: initialState,
};
