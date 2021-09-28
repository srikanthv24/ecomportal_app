import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import lemmetry from "../../assets/lemmetry.jpg";
import test from "../../assets/default_thumbnail.png";

const CategoryList = ({ list, loading }) => {
  const history = useHistory();

  let dummyList = new Array(10, {});

  if (loading) {
    return (
      <Row
        style={{ width: "100%" }}
        className="p-0 m-0 d-flex align-items-center justify-content-center"
      >
        {dummyList.map(() => {
          return (
            <Col
              key={"letmetry"}
              lg={4}
              md={4}
              sm={6}
              xs={6}
              className="mt-1 mb-2 p-0"
            >
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
                className="placeholder-glow"
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      backgroundImage: `url(${"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      height: "120px",
                      width: "120px",
                      borderRadius: "10%",
                      margin: 5,
                      textAlign: "center",
                    }}
                    className="placeholder-glow"
                  />
                </div>
                <div
                  style={{
                    height: 50,
                    maxHeight: 50,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <p className="text-muted placeholder-glow">
                    <span class="placeholder col-12">SAMPLE DATA.....</span>
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
  return (
    <>
      <Row
        style={{ width: "100%" }}
        className="p-0 m-0 d-flex align-items-center justify-content-center"
      >
        <Col
          key={"letmetry"}
          lg={4}
          md={4}
          sm={6}
          xs={6}
          className="mt-1 mb-2 p-0"
          onClick={() => history.push("/subscription")}
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundImage: `url(${
                    lemmetry ||
                    "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "120px",
                  width: "120px",
                  borderRadius: "10%",
                  margin: 5,
                  textAlign: "center",
                }}
              />
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
                className="text-muted"
                style={{ lineHeight: 1.5, textOverflow: "ellipsis" }}
              >
                Let me try!
              </h6>
            </div>
          </div>
        </Col>
        {list.length &&
          list.map((category) => (
            <Col
              key={category.id}
              lg={4}
              md={4}
              sm={6}
              xs={6}
              className="mt-1 mb-2 p-0"
              onClick={() =>
                history.push(`/products?category=${category.display_name}`)
              }
            >
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
                        category.defaultimg_url ? category.defaultimg_url : test
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
                    <img src={category.defaultimg_url ? category.defaultimg_url : test} style={{maxWidth:'128px', maxHeight:'128px'}} />
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
                    
                    style={{ lineHeight: 1.5, textOverflow: "ellipsis", color:'#212121' }}
                  >
                    {category.display_name}
                  </h6>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default CategoryList;
