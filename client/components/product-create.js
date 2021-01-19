import React from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store/product';
import ProductCreateForm from './product-create-form';

const defaultState = {
  name: '',
  price: 0,
  inventoryQuantity: 0,
  imageUrl: '',
  description: '',
  category: ''
};

class ProductMaker extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();
      await this.props.createProduct(this.state);
      this.setState({ defaultState });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <ProductCreateForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

// const mapState = (state) =>({

// })

const mapDispatch = (dispatch) => ({
  createProduct: (product) => dispatch(createProduct(product))
});

export default connect(null, mapDispatch)(ProductMaker);
