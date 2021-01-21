import React from 'react';
import { connect } from 'react-redux';
import product, {
  deleteProduct,
  getSingleProduct,
  updateProduct
} from '../store/product';
import { addToCart } from '../store/order';
import { withRouter } from 'react-router-dom';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      price: 1,
      inventoryQuantity: 1,
      imageUrl: '',
      description: '',
      category: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getSingleProduct(id);
    const { singleProduct } = this.props.product;
    this.setState({
      name: singleProduct.name,
      price: singleProduct.price,
      inventoryQuantity: singleProduct.inventoryQuantity,
      imageUrl: singleProduct.imageUrl,
      description: singleProduct.description,
      category: singleProduct.category
    });
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }
  async handleUpdate(event) {
    event.preventDefault();
    const id = this.props.match.params.id;
    let newProduct = { ...this.state, id };
    await this.props.updateProduct(this.state);
    await this.props.getSingleProduct(id);
    //this.props.history.push(`/products`);
  }

  render() {
    const { singleProduct } = this.props.product;
    const { user } = this.props.user;
    console.log('PROPS', user);

    return (
      <div className="single-product">
        {user.type === 'admin' ? (
          <div>
            <form onSubmit={this.handleUpdate}>
              {singleProduct ? (
                <>
                  <h3 className="single-title">
                    (Name:) <br />
                    <input
                      type="text"
                      name="name"
                      placeholder={singleProduct.name}
                      value={this.state.name}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                  </h3>

                  <img src={singleProduct.imageUrl} />
                  <h3 className="single-price">
                    (Price:)
                    <br />
                    <input
                      type="text"
                      name="price"
                      placeholder={`$` + singleProduct.price / 100}
                      value={this.state.price}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                  </h3>
                  <h3 className="inventoryQuantity">
                    (Quantity:)
                    <br />
                    <input
                      type="text"
                      name="inventoryQuantity"
                      placeholder={singleProduct.inventoryQuantity}
                      value={this.state.inventoryQuantity}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                  </h3>
                  <h3 className="category">
                    (Category:)
                    <br />
                    <select
                      name="category"
                      value={this.state.category}
                      placeholder={singleProduct.category}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    >
                      <option value=""></option>
                      <option value="adult">adult</option>
                      <option value="kids">kids</option>
                      <option value="luxury">luxary</option>
                      <option value="misc">misc</option>
                    </select>
                  </h3>
                  <h3 className="description">
                    (Description:)
                    <br />
                    <textarea
                      type="text"
                      name="description"
                      placeholder={singleProduct.description}
                      value={this.state.description}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                  </h3>
                  <button
                    className="button primary"
                    onClick={() => {
                      this.props.deleteProduct(singleProduct);
                      this.props.history.push('/products');
                    }}
                  >
                    DELETE
                  </button>
                  <button className="button secondary" type="submit">
                    SUBMIT CHANGES
                  </button>
                </>
              ) : (
                <div></div>
              )}
            </form>
          </div>
        ) : (
          <div>
            <h3 className="single-title">{singleProduct.name}</h3>
            <img src={singleProduct.imageUrl} />
            <h3 className="single-price">${singleProduct.price / 100}</h3>
            <h3 className="description">{singleProduct.description}</h3>
            <button
              className="button primary"
              onClick={() => {
                this.props.addToCart(singleProduct);
              }}
            >
              Add To Cart
            </button>
          </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  product: state.products,
  user: state.user
});

const mapDispatch = (dispatch) => ({
  getSingleProduct: (id) => dispatch(getSingleProduct(id)),
  addToCart: (cartItem) => dispatch(addToCart(cartItem)),
  updateProduct: (product) => dispatch(updateProduct(product)),
  deleteProduct: (product) => dispatch(deleteProduct(product))
});

export default connect(mapState, mapDispatch)(SingleProduct);
