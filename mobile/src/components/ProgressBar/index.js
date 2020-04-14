import React from 'react';

import { Container, Bar, Step, Badge, Name } from './styles';

export default function ProgressBar(delivery) {
  const deliveryStatus = {
    pending: 0,
    ongoing: 1,
    complete: 2,
  };

  function handleStatus(data) {
    if (data.status.end_date) {
      return deliveryStatus.complete;
    }
    if (data.status.start_date) {
      return deliveryStatus.ongoing;
    }
    return deliveryStatus.pending;
  }

  const stepStatus = ['Aguardando Retirada', 'Retirado', 'Entregue'];

  return (
    <Container>
      <Bar />
      {stepStatus.map((step, index) => (
        <Step key={step}>
          <Badge complete={handleStatus(delivery) >= index} />
          <Name>{step}</Name>
        </Step>
      ))}
    </Container>
  );
}
