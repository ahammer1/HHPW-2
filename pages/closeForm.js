import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import {
  createOrderPayments, createOrderstatus, getOrderStatus, getPayments,
} from '../api/PaymentData';

export default function CloseOrder() {
  const [paymentId, setPaymentId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [availablePaymentTypes, setAvailablePaymentTypes] = useState([]);

  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    getOrderStatus().then(setAvailableStatuses);
    getPayments().then(setAvailablePaymentTypes);
  }, []);

  const handleCloseOrder = () => {
    createOrderPayments(orderId, paymentId)
      .then(() => {
        createOrderstatus(orderId, statusId)
          .then(() => {
            router.push(`/Orders/${orderId}`);
          });
      });
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
            onChange={(e) => setPaymentId(e.target.value)}
            value={paymentId}
            required
          >
            <option value="">Select a payment type</option>
            {availablePaymentTypes.map((paymentType) => (
              <option key={paymentType.id} value={paymentType.id}>
                {paymentType.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Label>Order Status</Form.Label>
          <Form.Select
            aria-label="Status"
            name="orderStatus"
            onChange={(e) => setStatusId(e.target.value)}
            value={statusId}
            required
          >
            <option value="">Select an order status</option>
            {availableStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={handleCloseOrder}>
          Enjoy!
        </Button>
      </Form>
    </div>
  );
}
