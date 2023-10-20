import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrder } from '../api/OrderData';

export default function OrderCard({ ordObj, onUpdate }) {
  const deleteThisOrder = () => {
    if (window.confirm(`Delete ${ordObj.name}?`)) {
      deleteOrder(ordObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="hoverable-card"
      style={{ width: '18rem', margin: '10px' }}
    >
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>
          Name: {ordObj.name}
        </Card.Title>
        <p className="card-text bold" style={{ marginBottom: '5px' }}>
          Payment type: {ordObj.paymentTypesId === 0 ? 'Visa' : ' MasterCard' }
        </p>
        <p className="card-text bold" style={{ marginBottom: '5px' }}>
          Status:  {ordObj.statusId === 0 ? 'Open' : 'Closed' }
        </p>
        <p className="card-text bold" style={{ marginBottom: '5px' }}>
          Tip:{ordObj.tip}
          <p className="card-text bold" style={{ marginBottom: '5px' }}>
            Review: {ordObj.Review }
          </p>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link passHref href={`/Orders/${ordObj.id}`}>
            <Button variant="dark" className="mr-2">
              VIEW
            </Button>
          </Link>
          <Button variant="dark" className="mr-2" href={`/Orders/Edit/${ordObj.id}`}>
            EDIT
          </Button>
          <Button variant="dark" onClick={deleteThisOrder}>
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  ordObj: PropTypes.shape({
    id: PropTypes.number,
    statusId: PropTypes.number,
    paymentTypesId: PropTypes.number,
    name: PropTypes.string,
    tip: PropTypes.string,
    Review: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
