import React from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../store/product';

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleProduct(id);
  }

  render() {
    console.log(this.props);
    const { singleProduct } = this.props.product;

    return (
      <div className="container">
        {singleProduct ? (
          <div>
            <h3>{singleProduct.name}</h3>
            <img src={singleProduct.imageUrl} />
            {singleProduct.price / 100}
          </div>
        ) : (
          <h1>No Item Found!</h1>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.products
});

const mapDispatch = (dispatch) => ({
  getSingleProduct: (id) => dispatch(getSingleProduct(id))
});

export default connect(mapState, mapDispatch)(SingleProduct);
