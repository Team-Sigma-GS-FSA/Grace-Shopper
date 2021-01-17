import React from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../store/product';
import { addToCart } from '../store/order';

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleProduct(id);
  }

  render() {
    console.log(this.props);
    const { singleProduct } = this.props.product;

    return (
      <div>
        <h3>{singleProduct.name}</h3>
        <img src={singleProduct.imageUrl} />
        {singleProduct.price / 100}
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.products
});

const mapDispatch = (dispatch) => ({
  getSingleProduct: (id) => dispatch(getSingleProduct(id)),
  addToCart: (cartItem) => dispatch(addToCart(cartItem))
});

export default connect(mapState, mapDispatch)(SingleProduct);
