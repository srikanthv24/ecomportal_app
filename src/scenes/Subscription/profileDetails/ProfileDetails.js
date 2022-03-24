import React, { useState } from 'react';

import { Button, Card } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdMale, MdFemale } from 'react-icons/md';

import './ProfileDetailsStyles.css';

const ProfileDetails = ({ handleBack, handleNextStep, profileDetails, setProfileDetails }) => {
    const { gender, age, heightFeet, heightInch, weight } = profileDetails;
    const [errors, setErrors] = useState({ gender: false, age: false, heightFeet: false, heightInch: false, weight: false });

    const changeDetails = (changeObj) => {
        setProfileDetails({ ...profileDetails, ...changeObj });
    };

    const handleChange = (value, field) => {
        setErrors({ ...errors, [field]: false });
        if (value === '') {
            changeDetails({ [field]: value });
        } else {
            let canUpdate = false;
            switch (field) {
                case 'age':
                    if (/^\d+$/.test(value) && (value <= 150 && value > 0)) {
                        canUpdate = true;
                    }
                    break;
                case 'heightFeet':
                    if (/^\d+$/.test(value) && (value <= 8 && value >= 0)) {
                        canUpdate = true;
                    }
                    break;
                case 'heightInch':
                    if (/^\d+$/.test(value) && (value <= 11 && value >= 0)) {
                        canUpdate = true;
                    }
                    break;
                case 'weight':
                    if (/^[0-9]+([.][0-9]{0,2})?$/.test(value)) {
                        canUpdate = true;
                    }
                    break;
                default:
            }
            if (canUpdate) {
                changeDetails({ [field]: value });
            }
        }
    };

    const handleSubmit = () => {
        const errorObj = {};
        Object.keys(errors).forEach(field => {
            if (profileDetails[field] === '') {
                errorObj[field] = true;
            }
        });
        if (Object.keys(errorObj).length) {
            setErrors({ ...errors, ...errorObj });
        } else {
            handleNextStep();
        }
    };

    return (
        <section className="text-center" style={{ background: "rgb(249, 243, 223)" }}>
            <p className="fs-4 fw-bold mb-3 text-center page-title">I Am</p>
            <div>
                <Card className="gender-card p-0 border-0 bg-transparent">
                    <Card.Body className="py-3 px-0">
                        <div className={`d-flex rounded${errors.gender ? ' border border-danger' : ''}`}>
                            <MdMale
                                className={gender === 'Male' ? 'text-primary' : ''}
                                onClick={() => {
                                    setErrors({ ...errors, gender: false });
                                    changeDetails({ gender: 'Male' });
                                }}
                            />
                            <div class="vr"></div>
                            <MdFemale
                                className={gender === 'Female' ? 'text-primary' : ''}
                                onClick={() => {
                                    setErrors({ ...errors, gender: false });
                                    changeDetails({ gender: 'Female' });
                                }}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <Card className="bio-card p-0 border-0 bg-transparent">
                <Card.Body className="py-3 px-0">
                    <div class="input-group mb-3">
                        <input
                            className={`form-control${errors.age ? ' border border-danger' : ''}`}
                            value={age}
                            onChange={e => handleChange(e.target.value, 'age')}
                            type="text"
                            placeholder="Age"
                        />
                        <div class="input-group-append">
                            <span class="input-group-text">Yrs.</span>
                        </div>
                    </div>
                    <div className="height-row">
                        <div class="input-group mb-3">
                            <input
                                className={`form-control${errors.heightFeet ? ' border border-danger' : ''}`}
                                value={heightFeet}
                                onChange={e => handleChange(e.target.value, 'heightFeet')}
                                type="text"
                                placeholder="Height"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text">Ft.</span>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input
                                className={`form-control${errors.heightInch ? ' border border-danger' : ''}`}
                                value={heightInch}
                                onChange={e => handleChange(e.target.value, 'heightInch')}
                                type="text"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text">In.</span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input
                            className={`form-control${errors.weight ? ' border border-danger' : ''}`}
                            value={weight}
                            onChange={e => handleChange(e.target.value, 'weight')}
                            type="text"
                            placeholder="Weight"
                        />
                        <div class="input-group-append">
                            <span class="input-group-text">Kg.</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <div className="footer-button-wrap">
                <Button onClick={() => handleBack()} variant="secondary">
                    <FaChevronLeft />
                    BACK
                </Button>
                <Button onClick={() => handleSubmit()} variant="success">
                    NEXT
                    <FaChevronRight />
                </Button>
            </div>
        </section >
    );
};

export default ProfileDetails;
