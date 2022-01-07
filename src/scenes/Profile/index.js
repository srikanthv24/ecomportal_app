import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const Profile = () => {
    return (
        <Container fluid className="bg-1">
            <Row>
                <Col  style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"200px"}}>
                    <img src="https://d1u2xbew1ldorh.cloudfront.net/unsafe/400x400/smart/https://cdn1.listreports.com/2021/09/tgS32Yl7V.jpg" 
                        width="150" 
                        style={{borderRadius:"100px"}}
                        />
                </Col>
            </Row>
            <Row>
                <Col className='value-txt'>Name</Col>
            </Row>
            <Row>
            <Col className='value-txt clr-black'>Srikanth</Col>
            </Row>
            <Row>
                <Col className='value-txt'>Mobile</Col>
            </Row>
            <Row>
            <Col className='value-txt clr-black'>9951882523</Col>
            </Row>
            <Row>
            <Col className='value-txt'>Email</Col>
            </Row>
            <Row>
            <Col className='value-txt clr-black'>srikanthreddy.vemalla@gmail.com</Col>
            </Row>
            <Row>
            <Col className='value-txt'>Address</Col>
            </Row>
            <Row>
                <Col className='value-txt clr-black'>H.no: 1-37/1, Avanthi nagar, Bharath Nagar, Hyderabad</Col>
            </Row>
        </Container>
    )
}