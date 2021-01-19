import React from 'react';

// name: '',
// price: 0,
// inventoryQuantity: 0,
// imageUrl: '',
// description: '',
// category: ''

const ProductCreateForm = (props) => {
  const {
    name,
    price,
    inventoryQuantity,
    imageUrl,
    description,
    category,
    handleChange,
    handleSubmit
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={name}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            placeholder="4.99"
            value={price}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="inventoryQuantity">Inventory Quantity:</label>
          <input
            type="text"
            name="inventoryQuantity"
            placeholder="1"
            value={inventoryQuantity}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Describe the product here"
            value={description}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={category}
            onChange={(event) => {
              handleChange(event);
            }}
          >
            <option value=""></option>
            <option value="adult">adult</option>
            <option value="kids">kids</option>
            <option value="luxury">luxary</option>
            <option value="misc">misc</option>
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl">Image:</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="URL for the product image"
            value={imageUrl}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
