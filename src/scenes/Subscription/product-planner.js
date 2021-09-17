import React, { useEffect, useState, useRef, useReducer } from "react";
import { ButtonGroup, Form, ToggleButton, Button, Row, Col, Accordion, Badge } from "react-bootstrap";
import DatePicker, { Calendar } from "react-multi-date-picker";
//import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { components } from "react-select";
import { getAddresses } from "../../store/actions/addresses";
//import { getProductDetails } from "../../../store/actions/products";
//import { saveMealOrderData } from "../../../store/actions/orderMeal";

import { AddressModal } from "./address-modal";

const ProductPlanner = ({ handleBack, handleNextStep }) => {
  const dispatch = useDispatch();
  const [Variants, setVariants] = useState([]);
  const [AddressList, setAddressList] = useState([]);
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const selectedMealPlan = useSelector(state => state.mealPlans.details);
  const customerId = useSelector(state => state.customer.customerId);
  const mealPlanId = useSelector(state => state.mealPlans.mealPlanId);
  //const selectedMeal = useSelector((state) => state.products.productDetails);

  console.log("selected meal plan details:::", selectedMealPlan);
  
//   useEffect(() => {
//     dispatch(getProductDetails(productId));
//   }, []);

 
  //addresss labels
  const [addLabel1, setAddLabel1] = useState({});
  const [addLabel2, setAddLabel2] = useState({});
  const [addLabel3, setAddLabel3] = useState({});
  console.log("label:::", addLabel1);
  console.log("label:::", addLabel2);
  console.log("label:::", addLabel3);

   //modal state and handler functions 
   const [showModal, setShowModal] = useState(false);

   const  handleClose = () => setShowModal(false);
   const  handleShow = () => setShowModal(true);
 
  const handleAddressModal = () => {
    return handleShow(); 
  } 


  const SelectMenuButton = (props) => {
    return (
        <components.MenuList  {...props}>
            {props.children}
            <button className="bg-light w-100 border-0 text-start" onClick={handleAddressModal}>Add new address</button>
        </components.MenuList >
    ) }



  
  const [ mealOrder, setMealOrder] = useState('');
  
  const[ notes, setNotes ] = useState('');

  const [selectedDates1, setSelectedDates1] = useState([]);
  const [selectedDates2, setSelectedDates2] = useState([]);
  const [selectedDates3, setSelectedDates3] = useState([]);

  const [breakFastState, setBreakFastState] = useState({
    order_dates: selectedDates1,
    address: '',
    price: '',
    pickupORdelivery: ''
  })

  const [lunchState, setlunchState ] = useState({
    order_dates: selectedDates2,
    address: '',
    price: '',
    pickupORdelivery: ''
  })

  const [dinnerState, setDinnerState ] = useState({
    order_dates: selectedDates3,
    address: '',
    price: '',
    pickupORdelivery: ''
  })
  
  const handleDeliveryStatus = (key, value, name) => {
      console.log("key- value:::", key, value);
      if(name === "breakfast"){
         setBreakFastState({
          ...breakFastState,
          [key] : value
        });
      } else if(name === "lunch") {
        setlunchState({
          ...lunchState,
          [key] : value
        });
      } else if(name === "dinner") {
        setDinnerState({
          ...dinnerState,
          [key] : value
        });
      }
  }

  console.log("bf state::", breakFastState);
  console.log("lunch state:::", lunchState);
  console.log("dinner state::", dinnerState);

  useEffect(() => {
    setMealOrder({
        ...mealOrder,
        customer_id: customerId,
        customer_name: 'test',
        item_id: selectedMealPlan.id,
        item_name: selectedMealPlan.display_name,
        saleprice: selectedMealPlan.saleprice,
        qty: '1',
        mealplan_type: {
          breakfast: breakFastState,
          lunch: lunchState,
          dinner: dinnerState,
        },
        notes: notes,
        variant: [{ name: 'Exclusions', variant_item: [{ salePrice: '', tax: '', display_name: 'No Onion' }]},
                  { name: '', variantIem: [{ salePrice: '', tax: '', displayName: '' }]}
                  ],
      });

    //  return () => {
    //     dispatch(saveMealOrderData(mealOrder));
    //  }
      
  }, [customerId, selectedMealPlan, breakFastState, lunchState, dinnerState, selectedDates1, selectedDates2, selectedDates3, notes]);

  console.log("meal order data::", mealOrder);

  useEffect(() => {
    let temp = [];

    selectedMealPlan && selectedMealPlan.variant &&
    selectedMealPlan.variant.map((variant) => {
        let temp1 = [];
        variant.variant_items.map((varItem) => {
          temp1.push({
            label: varItem.display_name,
            value: varItem.display_name,
          });
        });
        temp.push({ ...variant, variant_item: temp1 });
      });
    setVariants(temp);
  }, [selectedMealPlan]);
 
  useEffect(() => {
    dispatch(getAddresses({ customerId }));
  }, [customerId]);

  useEffect(() => {
    console.log("Addresses-->", Addresses);
    let temp = [];

    if (Addresses.listAddresses) {
      console.log("Im Print", Addresses.listAddresses.items);
      const items = Addresses.listAddresses.items
      items.map((address) => {
        let label =
          address.tag +
          ": " +
          address.aline1 +
          ", " +
          address.aline2 +
          ", " +
          address.city +
          ", " +
          address.state +
          ", " +
          address.postalcode;
        temp.push({ label: label, value: address });
      });
      setAddressList(temp);
    }
    //console.log("Addresses-->2", temp);
  }, [Addresses]);


 console.log("addressssss:", AddressList )

  // let deliverables = [
  //   { name: "Breakfast", value: "breakFast" },
  //   { name: "Lunch", value: "lunch" },
  //   { name: "Dinner", value: "dinner" },
  // ];

 console.log("Variant==>", Variants);
  return (
    <Row>
      <Col xs={12} sm={12} md={6} lg={12}>
        <AddressModal customerId={customerId} handleClose={handleClose} handleShow={handleShow} showModal={showModal} />
      </Col>
      <Col xs={12} sm={12} md={6} lg={12}>
      {Variants &&
        Variants.map((variant) => {
          return (
            <div className="text-start">
              <p className="h6 text-muted mt-3 mb-0 m-2 text-start">
                {variant.display_name} *
              </p>
              <Select

                placeholder={variant.display_name}
                isMulti={variant.is_multiselect}
                options={variant.variant_items}
                // options={(variant) => { variant.variant_item.map(vi => {
                //   return {
                //     label: vi.display_name,
                //     value: vi.name
                //   }
                // })}}
                onChange={e => console.log("values:::", e)}
              />
            </div>
          );
        })}
        </Col>
        <Col xs={12} sm={12} md={6} lg={12} className="mt-4">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>BreakFast</Accordion.Header>
                  <Accordion.Body className="p-1">
                  <div style={{ width: "100%"}}>
                      <p className="h6 text-muted mt-3 mb-1 m-2 text-start">Date *</p>
                      <div 
                      className="text-start"
                      style={{ 
                      // justifyContent: "center", 
                      margin:"4px"
                      }}
                      >
                      <small className="fw-bold">Balance: 0</small>
                      <Calendar
                          multiple
                          style={{ width: "260px" }}
                          // plugins={[<DatePanel />]}
                        onChange={dates => {
                          let temp = []
                          dates.map(date => {
                            console.log(date.day+"-"+date.month+"-"+date.year);
                            temp.push(date.day+"-"+date.month+"-"+date.year)
                          })
                          setSelectedDates1(temp)
                        }}
                          />
                      </div>
                      </div>
                    <div>
                          <Form.Group
                            className="mb-3 text-start mt-3"
                            controlId="breakfast"
                            name="breakfast"
                            style={{ padding: "0 10px" }}
                            onChange={e => handleDeliveryStatus("pickupORdelivery", e.target.value, e.target.name)}
                            //onChange={e => console.log("RADIOOOO::",e.target.checked)}
                          >
                            <Form.Check
                              inline
                              name="breakfast"
                              value="pickup"
                              type="radio"
                              label="Pickup"
                              //checked
                            />
                            <Form.Check
                              inline
                              name="breakfast"
                              value="delivery"
                              type="radio"
                              label="Delivery"
                            />
                          </Form.Group>

                          <p className="h6 text-muted mt-3 mb-1 m-2 text-start">
                            Breakfast Address *
                          </p>
                          <Select
                            className="text-start"
                            name="breakfast"
                            placeholder={"select address..."}
                            //defaultValue={AddressList[0].label}
                            options={AddressList}
                            onChange={event => handleDeliveryStatus("address", event.value, event.name)}
                            //onChange={e => setAddLabel1(e.value)}
                            components={{ MenuList: SelectMenuButton }} 
                          />
                          { Object.keys(addLabel1).length>0 &&
                          <p className="text-wrap fs-6 fw-bold mt-1 text-start lh-1"><Badge>{addLabel1.tag}:</Badge>{" "}{`${addLabel1.aline1}, ${addLabel1.aline2}, ${addLabel1.city}, ${addLabel1.state}, ${addLabel1.postalcode}.`}</p>
                        }
                        </div>
                  </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Lunch</Accordion.Header>
              <Accordion.Body className="p-1">
                  <div style={{ width: "100%"}}>
                      <p className="h6 text-muted mt-3 mb-1 m-2 text-start">Date *</p>
                      <div 
                      style={{ 
                      // justifyContent: "center", 
                      margin:"4px"
                      }}
                      >
                      <small className="text-start">Balance: 0</small>
                      <Calendar
                          multiple
                          style={{ width: "260px" }}
                          // plugins={[<DatePanel />]}
                        onChange={dates => {
                          let temp = []
                          dates.map(date => {
                            console.log(date.day+"-"+date.month+"-"+date.year);
                            temp.push(date.day+"-"+date.month+"-"+date.year)
                          })
                          setSelectedDates2(temp)
                        }}
                          />
                      </div>
                      </div>
                    <div>
                          <Form.Group
                            className="mb-3 text-start mt-3"
                            //controlId={deliver.value}
                            name="breakfast"
                            style={{ padding: "0 10px" }}
                            //onChange={e => handleDeliveryStatus("pickupOrDelivery", e.target.value, e.target.name)}
                          >
                            <Form.Check
                              inline
                              name="lunch"
                              value="pickup"
                              type="radio"
                              label="Pickup"
                            />
                            <Form.Check
                              inline
                              name="lunch"
                              value="delivery"
                              type="radio"
                              label="Delivery"
                            />
                          </Form.Group>

                          <p className="h6 text-muted mt-3 mb-1 m-2 text-start">
                            Lunch Address *
                          </p>
                          <Select
                            className="text-start"
                            //name={deliver.name}
                            placeholder={"Address..."}
                            //defaultValue={label: AddressList[0]}
                            options={AddressList}
                            //onChange={event => handleDeliveryStatus("address", event.value, deliver.value)}
                            onChange={e => setAddLabel2(e.value)}
                            components={{ MenuList: SelectMenuButton }} 
                          />
                          { Object.keys(addLabel2).length>0 &&
                          <p className="text-wrap fs-6 fw-bold mt-1 text-start lh-1"><Badge>{addLabel2.tag}:</Badge>{" "}{`${addLabel2.aline1}, ${addLabel2.aline2}, ${addLabel2.city}, ${addLabel2.state}, ${addLabel2.postalcode}.`}</p>
                        }
                        </div>
                  </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Dinner</Accordion.Header>
              <Accordion.Body className="p-1">
                  <div style={{ width: "100%"}}>
                      <p className="h6 text-muted mt-3 mb-1 m-2 text-start">Date *</p>
                      <div 
                      style={{ 
                      // justifyContent: "center", 
                      margin:"4px"
                      }}
                      >
                      <small className="text-start">Balance: 0</small>
                      <Calendar
                          multiple
                          style={{ width: "260px" }}
                          // plugins={[<DatePanel />]}
                        onChange={dates => {
                          let temp = []
                          dates.map(date => {
                            console.log(date.day+"-"+date.month+"-"+date.year);
                            temp.push(date.day+"-"+date.month+"-"+date.year)
                          })
                          setSelectedDates3(temp)
                        }}
                          />
                      </div>
                      </div>
                    <div>
                          <Form.Group
                            className="mb-3 text-start mt-3"
                            //controlId={deliver.value}
                            name="dinner"
                            style={{ padding: "0 10px" }}
                            //onChange={e => handleDeliveryStatus("pickupOrDelivery", e.target.value, e.target.name)}
                          >
                            <Form.Check
                              inline
                              name="dinner"
                              value="pickup"
                              type="radio"
                              label="Pickup"
                            />
                            <Form.Check
                              inline
                              name="dinner"
                              value="delivery"
                              type="radio"
                              label="Delivery"
                            />
                          </Form.Group>

                          <p className="h6 text-muted mt-3 mb-1 m-2 text-start">
                            Dinner Address *
                          </p>
                          <Select
                            className="text-start"
                            //name={deliver.name}
                            placeholder={"Address..."}
                            //defaultValue={AddressList[0]}
                            options={AddressList}
                            //onChange={event => handleDeliveryStatus("address", event.value, deliver.value)}
                            onChange={e => setAddLabel3(e.value)}
                            components={{ MenuList: SelectMenuButton }} 
                          />
                          { Object.keys(addLabel3).length>0 &&
                          <p className="text-wrap fs-6 fw-bold mt-1 text-start lh-1"><Badge>{addLabel3.tag}:</Badge>{" "}{`${addLabel3.aline1}, ${addLabel3.aline2}, ${addLabel3.city}, ${addLabel3.state}, ${addLabel3.postalcode}.`}</p>
                        }
                        </div>
                  </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={12} sm={12} md={6} lg={12} className="mt-4">
       {/* <div style={{ width: "100%" }}>

       <p className="h6 text-muted mt-3 mb-1 m-2 text-start">Date *</p>
        <div 
      style={{ 
        justifyContent: "center", 
        margin:"4px"
      }}
    >
        <Calendar
           multiple
           style={{ width: "260px" }}
           plugins={[<DatePanel />]}
          onChange={dates => {
            let temp = []
            dates.map(date => {
              console.log(date.day+"-"+date.month+"-"+date.year);
              temp.push(date.day+"-"+date.month+"-"+date.year)
            })
            setSelectedDates(temp)
          }}
           />
        </div>
      </div>
      {deliverables.map((deliver) => {
        return (
          <div>
            <p className="h6 text-muted mt-3 mb-3 m-2 text-start">{deliver.name}</p>
            <Form.Group
              className="mb-3 text-start"
              controlId={deliver.value}
              name={deliver.value}
              style={{ padding: "0 10px" }}
              onChange={e => handleDeliveryStatus("pickupOrDelivery", e.target.value, e.target.name)}
            >
              <Form.Check
                inline
                name={deliver.value}
                value="pickup"
                type="radio"
                label="Pickup"
                // checked
              />
              <Form.Check
                inline
                name={deliver.value}
                value="delivery"
                type="radio"
                label="Delivery"
              />
            </Form.Group>

            <p className="h6 text-muted mt-3 mb-1 m-2 text-start">
              {deliver.name} Address *
            </p>
            <Select
              name={deliver.name}
              placeholder={"Address..."}
              options={AddressList}

              onChange={event => handleDeliveryStatus("address", event.value, deliver.value)}
            />
          </div>
        );
      })}

      <Form.Group className="mb-3 text-start" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          <p className="h6 text-muted mt-3 mb-0 m-2 ">Note: </p>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="note while delivery..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Form.Group>
   */}
   </Col>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} className="d-flex mt-2">
        <Button onClick={handleBack} className="w-50 m-1" variant="secondary">
                Back
          </Button>
          <Button 
              className="w-50 m-1" 
              variant="primary" 
              onClick={() => {
                handleNextStep();
                //dispatch(saveMealOrderData(mealOrder));
                console.log("order meal action disptach will be written here")
              }}>
              PROCEED TO PAY
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default ProductPlanner;