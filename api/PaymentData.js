const dbUrl = 'https://localhost:7120';

const getPayments = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/payments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deletePayment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/payments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete payment. Status: ${response.status}`);
      }
      resolve(response);
    })
    .catch(reject);
});

const createPayment = (paymentObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentObj),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrderPayments = (OrderId, PaymentTypeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/OrderPaymentTypes/${OrderId}/${PaymentTypeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrderstatus = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orderstatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getOrderStatus = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orderstatus`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getPayments,
  createPayment,
  deletePayment,
  createOrderPayments,
  createOrderstatus,
  getOrderStatus,
};
