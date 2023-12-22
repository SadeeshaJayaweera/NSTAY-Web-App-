import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AllBoardings = () => {
  return (
    <Container
      style={{
        height: "600px",
        border: "2px solid var(--Gray-5, #E0E0E0)",
        borderRadius: "6px",
        marginTop: "60px",
      }}
    >
      <Row>
        <Col sm={3}>
          <Container
            style={{
              height: "550px",
              border: "2px solid var(--Gray-5, #E0E0E0)",
              borderRadius: "6px",
              marginTop: "20px",
            }}
          ></Container>
        </Col>
        <Col sm={9}>
          <Container
            style={{
              height: "550px",
              border: "0.5px solid #2F80ED",
              borderRadius: "6px",
              marginTop: "20px",
            }}
          ></Container>
        </Col>
      </Row>
    </Container>
  );
};
export default AllBoardings;
