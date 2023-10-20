import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderForm from '../../../components/OrderForm';
import { getSingleOrder } from '../../../api/OrderData';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { Id } = router.query;

  useEffect(() => {
    getSingleOrder(Id).then(setEditItem);
  }, [Id]);

  return (<OrderForm obj={editItem} />);
}
