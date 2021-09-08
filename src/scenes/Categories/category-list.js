import React from "react";
import { Card, Col, Row } from "react-bootstrap";

import { useHistory } from "react-router-dom";

const CategoryList = ({ list }) => {
  const history = useHistory();
  return (
    <>
      <Row style={{ overflow: "auto" }}>
        {list.length &&
          list.map((category) => (
            <Col
              lg={4}
              md={4}
              sm={6}
              xs={6}
              key={category.id}
              className="mt-1 mb-2"
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
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        category.defaultimg_url ||
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
