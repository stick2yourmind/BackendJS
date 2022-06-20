const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const should  = require("chai").should();

let cookie = undefined
let cartId = undefined
const product = {
  "prodId": "628c3a5021a40c383e3be9b2",
  "quantity": "1"
  }
describe("POST /login", function () {
  it("login and redirect to product's page", async function () {
    let usuario = { username: "test22@gmail.com", password: "test22" }
    const response = await request.post("/login")
      .send(usuario);
    cookie = response.headers['set-cookie']
    // console.log(response)
    // console.log(response.headers['set-cookie'])
    // If login occurs, user will be redirect to /productos
    expect(response.status).to.eql(302);
    expect(response.header['location']).to.eql('/productos');
  });
});

describe("POST /api/order-cart", function () {
  it("Create a new cart", async function () {
    let usuario = { username: "test22@gmail.com", password: "test22" }
    const response = await request.post("/api/order-cart")
      .set('Cookie', cookie)

    cartId = response._body.result._id
    console.log('cartId')
    console.log(cartId)
    expect(response.status).to.eql(200)
    should.not.equal(cartId, undefined);
  });
});

describe("POST /api/order-cart", function () {
  it("Add a product to cart", async function () {
    const response = await request.post(`/api/order-cart/${cartId}/productos`)
      .set('Cookie', cookie)
      .send(product);

    expect(response.status).to.eql(200)
  });
});

describe("GET /api/order-cart", function () {
  it("Get product added to cart", async function () {
    const response = await request.get(`/api/order-cart/${cartId}/productos`)
      .set('Cookie', cookie)

    console.log(response.body.cart.products)
    expect(response.body.cart.products[0]._id).to.eql(product.prodId)
  });
});

describe("DELETE /api/order-cart", function () {
  it("Delete a cart", async function () {
    const response = await request.delete(`/api/order-cart/${cartId}`)
      .set('Cookie', cookie)

      // console.log('response.body')
      // console.log(response.body)
    expect(response.body.result.deletedCount).to.eql(1)
  });
});