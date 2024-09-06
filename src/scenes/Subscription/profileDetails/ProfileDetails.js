import React from "react";
import { Button, Card } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ProfileDetailsStyles.css";

const ProfileDetails = ({
  handleBack,
  handleNextStep,
  profileDetails,
  setProfileDetails,
}) => {
  const { gender, age, heightFeet, heightInch, weight } = profileDetails;
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({
    defaultValues: {
      gender: gender,
      age: age,
      heightFeet:heightFeet,
      heightInch: heightInch,
      weight: weight
    }
  });

 
  const onSubmit = (data) => {
    setProfileDetails({ ...data });
    handleNextStep();
  };
  React.useEffect(() => {
    setValue("gender", "Male", {
      shouldValidate: true,
    });

  },[]);

  return (
    <section
      className="text-center"
      style={{ background: "rgb(249, 243, 223)" }}
    >
      <p className="fs-4 fw-bold mb-3 text-center page-title">I Am</p>
      <div>
        <Card className="bio-card p-1 border-0 bg-transparent">
          <Card.Body className="px-0">
            <div class="radio-toolbar mb-2 pos-rel mx-auto">
            <Controller
               name="gender"
              control={control}
              rules={{ required: true, min: 1, max: 100 }}
              render={({ field: { onChange, value, ...rest }  }) => (
                <>
                <input
                type="radio"
                id="gender-male"
                value="Male" checked
                {...rest}
                defaultChecked={gender === "Male" ? true : false}
                onChange={(e) => {setValue('gender', e.target.value, { shouldValidate: true })}}
              />  
              <label for="gender-male">Male</label>
              <input
                type="radio"
                id="gender-female"
                value="Female"
                defaultChecked={gender === "Female" ? true : false}
                {...rest}
                onChange={(e) => {setValue('gender', e.target.value, { shouldValidate: true })}}
              />
              <label for="gender-female">Female</label>
                </>
              )}
            />
             <div className="error-text-block1">
            {errors.gender && (
              <p className="text-danger pr-error-text" style={{ textAlign: "center" }}>
                Please select your gender
              </p>
            )}
            </div>
            </div>
           
          </Card.Body>
        </Card>
      </div>
      <Card className="bio-card p-0 border-0 bg-transparent">
        <Card.Body className="py-2 px-0">
          <div class="input-group mb-4 pos-rel">
          <Controller
              control={control}
              rules={{ required: true, min: 1, max: 100
              }}
               render={({ field: { onChange, value, ...rest }  }) => (
                <input
                className={`form-control${errors.age ? " border border-danger" : ""}`}
                value={value}
                placeholder="Age" type="number"
                {...rest}
                onChange={(e) => {setValue('age', e.target.value, { shouldValidate: true })}}
              />
              )}
              name="age"
            />
            <div class="input-group-append">
              <span class="input-group-text">Yrs.</span>
            </div>
            <div className="error-text-block">
          {errors.age && (
              <p className="text-danger pr-error-text mb-0" style={{ textAlign: "left" }}>
                Please enter your age between 1 - 100
              </p>
            )}
          </div>
          </div>
            
         
          <div className="height-row pos-rel">
            <div class="input-group mb-4 pos-rel">
            <Controller
              control={control}
              name="heightFeet"
              rules={{ required: true, min: 1, max: 11 }}
              render={({ field: { onChange, value, ...rest }  }) => (
              <input
                className={`form-control${errors.heightFeet ? " border border-danger" : ""}`}
                value={value}
                placeholder="Height" type="number"
                {...rest}
                onChange={(e) => {setValue('heightFeet', e.target.value, { shouldValidate: true })}}
              />
              )}
            />
              <div class="input-group-append">
                <span class="input-group-text">Ft.</span>
              </div>
            </div>
            <div class="input-group mb-4">
            <Controller
              control={control}
              name="heightInch" 
              rules={{ required: true, min: 0, max: 11 }}
              render={({ field: { onChange,value, ...rest }  }) => (
                <input
                  className={`form-control${
                    errors.heightInch ? " border border-danger" : ""
                  }`}
                  value={value} type="number"                  
                  {...rest}
                  onChange={(e) => {setValue('heightInch', e.target.value,  { shouldValidate: true })}}
                />
              )}
              />
              <div class="input-group-append">
                <span class="input-group-text">In.</span>
              </div>
            </div>
            <div className="error-text-block">
            {errors.heightFeet || errors.heightInch ? (
              <p
                className="text-danger pr-error-text"
                style={{ textAlign: "left" }}
              >{`Please enter your height in ${errors.heightFeet ? "feet" : ""}${errors.heightInch ? " Inch" : ""}`}</p>
            ) : ''}
            </div>
          </div>
          <div class="input-group mb-4 pos-rel">
          <Controller
              control={control}
              name="weight"
              rules={{ required: true, min: 1, max: 200 }}
              render={({ field: { onChange,value, ...rest }  }) => (
                <input
                  className={`form-control${
                    errors.weight ? " border border-danger" : ""
                  }`}
                  value={value}
                  placeholder="Weight" type="number"
                  {...rest}
                  onChange={(e) => {setValue('weight', e.target.value,  { shouldValidate: true })}}
                />
              )}
              />
            <div class="input-group-append">
              <span class="input-group-text">Kg.</span>
            </div>
            <div className="error-text-block">
            {errors.weight && (
            <p className="text-danger pr-error-text" style={{ textAlign: "left" }}>
              Please enter your weight between 1 - 200
            </p>
          )} 
            </div>
          </div>
          
        </Card.Body>
      </Card>
      <div className="footer-button-wrap bio-card px-0">
        <Button onClick={() => handleBack()} className="vl-btn-secondary-1">
          <FaChevronLeft />
          Back
        </Button>
        <Button onClick={handleSubmit(onSubmit)} className="vl-btn-primary">
          Next
          <FaChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default ProfileDetails;
