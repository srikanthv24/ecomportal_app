import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Accordion } from "react-bootstrap";
import "./styles.scss";

function FAQ() {
    let history = useHistory();
    return (
        <>
            <section className="vlfaq-wrapper py-5">
                <h4 className="faq-titletxt">Frequently asked questions</h4>
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Menu & Cuisine</Accordion.Header>
                        <Accordion.Body>
                            <p>The meals are packed in microwavable containers. The heating instructions for your meals will be mentioned on the app.</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Custom Diet & Special Needs</Accordion.Header>
                        <Accordion.Body>
                            <p>Yes, we deliver on Sundays as well.</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Pricing, Biling & Cancellations</Accordion.Header>
                        <Accordion.Body>
                            <p>Meals changes can be madden the app before 9 am the previous day. Delivery related changes can be made on the app before 10 pm the previous day.</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Timings, Pausing & Rescheduling</Accordion.Header>
                        <Accordion.Body>
                            <p>Meals changes can be madden the app before 9 am the previous day. Delivery related changes can be made on the app before 10 pm the previous day.</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Calories, Nutrition & Weight Management</Accordion.Header>
                        <Accordion.Body>
                            <p>Meals changes can be madden the app before 9 am the previous day. Delivery related changes can be made on the app before 10 pm the previous day.</p>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
            </section>
        </>
    )
}
export default FAQ;