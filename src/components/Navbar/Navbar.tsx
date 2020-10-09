import { Menu, Dropdown, Row, Col, Button } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { product } from "../Home/Home";

export interface Props {
  cartItems: [];
}

class Navbar extends React.Component<Props> {
  calculate = (product: product) => {
    if (product.quantity !== undefined) {
      return product.quantity * product.price;
    }
  };

  calculateGrandTotal = () => {
    const sum = this.props.cartItems.reduce(function (acc, obj: product) {
      return acc + obj.quantity! * obj.price;
    }, 0);
    return sum.toFixed(2);
  };

  renderCart = () => {
    const { cartItems } = this.props;
    return (
      <>
        <Row>
          {cartItems.length > 0 ? (
            <Row className="cart-desc">
              {cartItems.length > 0 &&
                cartItems.map((product: product) => (
                  <>
                    <Row className="cart-row">
                      <Col span={12} className="cart-product-title">
                        {product.title.substring(0, 12)}
                      </Col>
                      <Col span={12} className="cart-product-price">
                        ${product.price}
                      </Col>
                    </Row>
                    <Row className="cart-row">
                      <Col span={24} className="cart-product-quantity">
                        &#215; {product.quantity}
                      </Col>
                    </Row>
                    <Row className="cart-row">
                      <Col span={24} className="cart-product-total">
                        Total: ${this.calculate(product)}
                      </Col>
                    </Row>
                    <hr className="divider"></hr>
                  </>
                ))}
              <Row className="cart-row">
                <Col span={24} className="grand-total">
                  Grand Total: ${this.calculateGrandTotal()}
                </Col>
              </Row>
              <Row className="cart-row ">
                <Col span={24}>
                  <Link to="/checkout">
                    <Button
                      type="primary"
                      shape="round"
                      icon={<ShoppingCartOutlined />}
                      className="checkout-btn checkout-row"
                    >
                      Checkout
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Row>
          ) : (
            <div className="cart-message">No items added.</div>
          )}
        </Row>
      </>
    );
  };
  render() {
    return (
      <>
        <Menu mode="horizontal" className="navbar">
          <Link to="/">
            <span className="title">Frantic Inc.</span>
          </Link>
          <Dropdown
            overlay={this.renderCart()}
            trigger={["click"]}
            className="cart-dropdown"
          >
            <span className="cart-item-length">
              {this.props.cartItems.length}
              <ShoppingCartOutlined className="cart-icon" />
            </span>
          </Dropdown>
        </Menu>
      </>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps)(Navbar);
