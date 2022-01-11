import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomerBalance } from '../../store/actions';

export const Profile = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.auth.userDetails);
    const balanceState = useSelector((state) => state.balanceReducer);


    useEffect(() => {
        if(userDetails.sub && userDetails.sub.length) {
            console.log("balance action creator is called",userDetails.sub);
            dispatch(getCustomerBalance({customerId: userDetails.sub}))
        }
    }, [userDetails.sub]);

    console.log("balance redux state", balanceState);


    return (
        <Container fluid>
            <Row  className="bg-1">
                <Col  style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"200px"}}>
                    <img src="https://ui-avatars.com/api/?name=Ania+Bista&background=A1A1A1&color=FFFFFF&rounded=true" 
                        width="150" 
                        style={{borderRadius:"200px"}}
                        />
                </Col>
            </Row>
            {userDetails?.name && (
                <>
                    <Row>
                    <Col className='value-txt'>Name</Col>
                </Row>
                 <Row>
                     <Col className='value-txt clr-black'>{userDetails?.name}</Col>
                 </Row>
                </>
            )
            }
             {userDetails?.phone_number && (
                <>
                 <Row>
                <Col className='value-txt'>Mobile</Col>
            </Row>
            <Row>
            <Col className='value-txt clr-black'>{userDetails?.phone_number}</Col>
            </Row>
               </>
                )
            }
            {/* {balanceState && balanceState?.getCustomerBalance && ( */}
                <>
                    <Row>
                    <Col className='value-txt'>Wallet balance</Col>
                </Row>
                 <Row>
                     <Col className='value-txt clr-black'>{balanceState.getCustomerBalance?.amount !== undefined ? Number(balanceState.getCustomerBalance?.amount).toFixed(2) : Number(0).toFixed(2)}</Col>
                 </Row>
                </>
                {/* )}  */}
            <Row>
            <Col className='value-txt'>Email</Col>
            </Row>
            <Row>
            <Col className='value-txt clr-black'>test@gmail.com</Col>
            </Row>
            <Row>
            <Col className='value-txt'>Address</Col>
            </Row>
            <Row>
                <Col className='value-txt clr-black'>H.no: 1234, Hyderabad, India</Col>
            </Row>
        </Container>
    )
}