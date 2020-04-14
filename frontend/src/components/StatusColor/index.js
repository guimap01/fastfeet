import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function StatusColor({ status }) {
  const [statusColor, setStatusColor] = useState({
    background: '',
    color: '',
  });

  useEffect(() => {
    switch (status) {
      case 'ENTREGUE': {
        setStatusColor({
          background: '#DFF0DF',
          color: '#2CA42B',
        });
        break;
      }
      case 'RETIRADA': {
        setStatusColor({
          background: '#BAD2FF',
          color: '#4D85EE',
        });
        break;
      }
      case 'PENDENTE': {
        setStatusColor({
          background: '#F0F0DF',
          color: '#C1BC35',
        });
        break;
      }
      case 'CANCELADA': {
        setStatusColor({
          background: '#FAB0B0',
          color: '#DE3B3B',
        });
        break;
      }
      default: {
        setStatusColor({
          background: '#ddd',
          color: '#ccc',
        });
        break;
      }
    }
  }, [status]);

  return (
    <Container background={statusColor.background} color={statusColor.color}>
      <div />
      <strong>{status}</strong>
    </Container>
  );
}

StatusColor.propTypes = {
  status: PropTypes.string.isRequired,
};
