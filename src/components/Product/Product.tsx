import React from "react";
import "./Product.css";
import { Col } from "antd";
import { product } from "../Home/Home";
import { Link } from "react-router-dom";

export interface Props {
  product: product;
}

class Product extends React.Component<Props> {
  render() {
    const product = this.props.product;
    return (
      <>
        <Col span={6} className="product-list">
          <Link
            to={{
              pathname: `/detail/${product.id}`,
              state: { product },
            }}
            className="product-link"
          >
            <div className="product-div">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div>{product.title}</div>
              <div>{product.price}$</div>
              <div>
                {Math.floor(Math.random() * (100 - 20 + 1)) + 20} in stock
              </div>
            </div>
          </Link>
        </Col>
      </>
    );
  }
}

export default Product;
