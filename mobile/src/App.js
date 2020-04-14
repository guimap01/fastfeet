/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function src() {
  const signed = useSelector((state) => state.user.signed);

  const Routes = createRouter(signed);
  return <Routes />;
}
