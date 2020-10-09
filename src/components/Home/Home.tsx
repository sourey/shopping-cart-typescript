import React from "react";
import { connect } from "react-redux";
import { getProducts } from "./../../ducks/productsDuck";
import { Row, Col, Pagination, Spin } from "antd";
import Product from "../Product/Product";
import "./Home.css";

export interface Props {
  getProducts: () => {};
  products: [];
  isLoading: boolean;
}

export interface product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity?: number;
}

class Home extends React.Component<Props> {
  state = {
    page: 1,
    pageSize: 8,
  };

  componentDidMount() {
    this.props.getProducts();
  }

  handlePageChange = (page: number, pageSize?: number) => {
    this.setState({ page, pageSize });
  };

  render() {
    const { page, pageSize } = this.state;
    const { products, isLoading } = this.props;
    return (
      <>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            {!isLoading ? (
              <Row>
                {products
                  .slice((page - 1) * pageSize, page * pageSize)
                  .map((product: product) => (
                    <Product product={product} />
                  ))}
              </Row>
            ) : (
              <Row>
                <Col span={24}>
                  <Spin size="large" className="spinner" />
                </Col>
              </Row>
            )}
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row className="pagination-row">
          <Col span={24} className="pagination">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={8}
              total={this.props.products.length}
              onChange={this.handlePageChange}
            />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  products: state.products,
  isLoading: state.loading,
});

const mapActionToProps = { getProducts };

export default connect(mapStateToProps, mapActionToProps)(Home);
