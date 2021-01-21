export const addToGuestCart = (product) => {
  if (!localStorage.getItem('sigmaGuestCart')) {
    const guestCart = [];
    product.orders = [{ order_product: { quantity: 1 } }];
    guestCart.push(JSON.stringify(product));
    localStorage.setItem('sigmaGuestCart', JSON.stringify(guestCart));
  } else {
    let guestCart = JSON.parse(localStorage.getItem('sigmaGuestCart')) || [];
    guestCart = guestCart.map((str) => JSON.parse(str));
    const prodIds = guestCart.map((product) => product.id);
    if (!prodIds.includes(product.id)) {
      guestCart.push(product);
    }
    guestCart = guestCart.map((obj) => JSON.stringify(obj));
    localStorage.setItem('sigmaGuestCart', JSON.stringify(guestCart));
  }
};

export const removeFromGuestCart = (delProduct) => {
  let guestCart = JSON.parse(localStorage.getItem('sigmaGuestCart')) || [];
  guestCart = guestCart.map((str) => JSON.parse(str));
  guestCart = guestCart.filter((product) => product.id !== delProduct.id);
  guestCart = guestCart.map((obj) => JSON.stringify(obj));
  localStorage.setItem('sigmaGuestCart', JSON.stringify(guestCart));
};

export const editGuestCart = (editProduct, quantity) => {
  let guestCart = JSON.parse(localStorage.getItem('sigmaGuestCart')) || [];
  guestCart = guestCart.map((str) => JSON.parse(str));
  guestCart = guestCart.map((product) => {
    if (product.id !== editProduct.id) {
      return product;
    } else {
      product.orders[0].order_product.quantity = quantity;
      return product;
    }
  });
  guestCart = guestCart.map((obj) => JSON.stringify(obj));
  localStorage.setItem('sigmaGuestCart', JSON.stringify(guestCart));
};

export const clearGuestCart = () => {
  delete window.localStorage.sigmaGuestCart;
};

export const getGuestCart = () => {
  let guestCart = JSON.parse(localStorage.getItem('sigmaGuestCart')) || [];
  guestCart = guestCart.map((str) => JSON.parse(str));
  console.log(guestCart);
  return guestCart;
};
