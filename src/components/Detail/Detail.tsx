import { Row, Col, InputNumber, Button } from "antd";
import React from "react";
import "./Detail.css";
import { product } from "../Home/Home";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../ducks/productsDuck";

export interface Props {
  location: { state: { product: product } };
  addToCart: any;
  removeFromCart: any;
}
export interface State {
  quantity: string | number | undefined;
}

class Detail extends React.Component<Props, State> {
  state = {
    quantity: 1,
  };

  handleQuantity = (value: string | number | undefined) => {
    this.setState({ quantity: value });
  };

  handleAddToCart = (product: product) => {
    const newProduct = { ...product };
    newProduct.quantity = this.state.quantity;
    this.props.addToCart(newProduct);
  };

  handleRemoveFromCart = (productId: number) => {
    this.props.removeFromCart(productId);
  };

  render() {
    const product = this.props.location.state.product;
    const productId = product.id;
    const { quantity } = this.state;
    return (
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Row className="product-detail-div">
            <Col span={4}></Col>
            <Col span={4}>
              <img
                src={product.image}
                alt={product.title}
                className="detail-image"
              />
            </Col>
            <Col span={16} className="detail">
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price}</div>
              <Row>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={10}
                    value={quantity}
                    size="middle"
                    className="quantity"
                    onChange={this.handleQuantity}
                  />
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => this.handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DeleteOutlined />}
                    onClick={() => this.handleRemoveFromCart(productId)}
                    className="remove-item"
                  ></Button>
                </Col>
                <Col span={12}></Col>
              </Row>
            </Col>
            <Col span={4}></Col>
            <Row>
              <Col span={24} className="description">
                {product.description}
              </Col>
            </Row>
          </Row>
        </Col>
        <Col span={2}></Col>
      </Row>
    );
  }
}

const mapActionToProps = {
  addToCart,
  removeFromCart,
};

export default connect(null, mapActionToProps)(Detail);
