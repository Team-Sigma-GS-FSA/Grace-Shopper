import React from 'react';
import { connect } from 'react-redux';

const OrderConfirmed = ({ orderId }) => {
  return (
    <div>
      <h1>Order confirmed!</h1>
      <div>Congratulations! You just placed Order #{orderId}. Enjoy!</div>
    </div>
  );
};

const mapState = (state) => ({
  orderId: state.order.orderId
});

export default connect(mapState)(OrderConfirmed);
