import { Row, Col,Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { product } from "../Home/Home";
import "./Checkout.css";
import {removeFromCart} from '../../ducks/productsDuck'
import { DeleteOutlined } from '@ant-design/icons';

export interface Props {
  cartItems: [];
  removeFromCart:any
}

class Checkout extends React.Component<Props> {
  calculateGrandTotal = () => {
    const sum = this.props.cartItems.reduce(function (acc, obj: product) {
      return acc + obj.quantity! * obj.price;
    }, 0);
    return sum.toFixed(2);
  };

  handleRemoveFromCart = (productId: number) => {
    this.props.removeFromCart(productId);
  };

  render() {
    const { cartItems } = this.props;
    return (
      <>
        <div className="checkout-title">
          <h3>Checkout</h3>
        </div>
        <Row className="headers">
          <Col span={2} className="header-title">
            SN
          </Col>
          <Col span={20}>
            <Row>
              <Col span={4} className="header-title">
                Item
              </Col>
              <Col span={4} className="header-title">
                Name
              </Col>
              <Col span={4} className="header-title">
                Quantity
              </Col>
              <Col span={4} className="header-title">
                Price
              </Col>
              <Col span={4} className="header-title">
                Total
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
        </Row>
        {cartItems.map((item: product, idx) => (
          <Row className="items-row">
            <Col span={2} className="checkout-title product-title">
              {idx + 1}.
            </Col>
            <Col span={20}>
              <Row>
                <Col span={4}>
                  <img src={item.image} className="product-image" />
                </Col>
                <Col span={4} className="checkout-title product-title">
                  {item.title}
                </Col>
                <Col span={4} className="checkout-title product-title">
                  {item.quantity}
                </Col>
                <Col span={4} className="checkout-title product-title">
                  ${item.price}
                </Col>
                <Col span={4} className="checkout-title product-title">
                  ${item.quantity! * item.price}
                </Col>
                <Col span={4} className="checkout-title product-title">
                <Button
                    type="primary"
                    shape="round"
                    icon={<DeleteOutlined />}
                    onClick={() => this.handleRemoveFromCart(item.id)}
                    className="remove-item"
                  ></Button>
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
        ))}
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Row>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4} className="checkout-grand-total">
                Grand Total: ${this.calculateGrandTotal()}
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  cartItems: state.cartItems,
});

const mapActionToProps={
    removeFromCart
}
export default connect(mapStateToProps, mapActionToProps)(Checkout);
