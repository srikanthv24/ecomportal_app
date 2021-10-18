import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import lemmetry from "../../assets/lemmetry.jpg";
import test from "../../assets/default_thumbnail.png";
import "./styles.css";

const CategoryList = ({ list, loading }) => {
  const history = useHistory();

  

 
  return (
    <>
      <Row
        style={{ width: "100%" }}
        className="p-0 m-0 d-flex align-items-center justify-content-center"
      >
        {list.length &&
          list.map((category) => (
            <Col
              key={category.id}
              lg={3}
              md={4}
              sm={6}
              xs={6}
              className="mt-2 mb-3"
              onClick={() =>
                history.push(`/products?category=${category.display_name}`)
              }
            >
              <div className="category-item">
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    //   background: "#ccc",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      key={category.id}
                      style={{
                        backgroundImage: `url(${
                          category.defaultimg_url
                            ? category.defaultimg_url
                            : test
                        })`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "128px",
                        width: "128px",
                        borderRadius: "10%",
                        margin: 5,
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={
                          category.defaultimg_url
                            ? category.defaultimg_url
                            : test
                        }
                        style={{ maxWidth: "128px", maxHeight: "128px" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      height: 50,
                      maxHeight: 50,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <h6
                      style={{
                        lineHeight: 1.5,
                        textOverflow: "ellipsis",
                        color: "#212121",
                      }}
                    >
                      {category.display_name}
                    </h6>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default CategoryList;
