const Product = require('../models/product');
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {

  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    }).catch(err => err ? console.log(err) : "");
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;

  Product.findById(id).then(product => {
    return req.user.addToCart(product);
  }).then(result => {
    // console.log(result);
    res.redirect('/cart');
  })

};

exports.postDeleteCart = (req, res, next) => {
  const id = req.body.id;

  req.user.deleteItemFromCart(id)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => err ? console.log(err) : "");
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
      console.log(orders);
    }).catch(err => err ? console.log(err) : "");
    
};

exports.postOrder = (req, res, next) => {
  // let fetchedCart;
  req.user
  .addOrder()
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => err ? console.log(err) : "");
}

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };

exports.getProduct = (req, res, next) => {
  const id = req.params.id
  Product.findById(id).then(product => {
    res.render('shop/product-detail', {
      path: "/products",
      pageTitle: "Product Detail",
      product: product
    });
  }).catch(err => console.log(err));
}