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

      <div className="single-product">
        <h3 className="single-title">{singleProduct.name}</h3>
        <img src={singleProduct.imageUrl} />
        <h3 className="single-price">${singleProduct.price / 100}</h3>
        <h3 className="description">{singleProduct.description}</h3>
        <button
          className="button primary"
          onClick={() => {
            this.addItemsToCart(product);
          }}
        >
          Add To Cart
        </button>
      
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
