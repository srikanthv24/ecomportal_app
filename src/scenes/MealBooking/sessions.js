import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export const Sessions = ({ control }) => {
  const methods = useFormContext();
  const { watch, setValue } = methods;
  const { subscription, variants } = watch();

  const { fields } = useFieldArray({
    control: control,
    name: "subscription",
  });

  const mealSessions = [
    { label: "Breakfast", value: "B" },
    { label: "Lunch", value: "L" },
    { label: "Dinner", value: "D" },
  ];

  return (
    <>
      <div className="form-check">
        <p className="h6 text-start mb-1 text-muted">Choose Meal Sessions</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {mealSessions.map((item, index) => {
            return (
              <FormControlLabel
                label={item.label}
                control={
                  <Checkbox sx={{ "& .MuiSvgIcon-root": {fontSize: 28} }} style={{color:'rgb(240, 89, 34)'}} />
                }
                checked={subscription[index].is_included}
                onChange={(ev) => {
                  let temp = [...subscription];
                  if (ev.target.checked) {
                    temp[index] = {
                      ...temp[index],
                      meal_type: item.value,
                      is_included: ev.target.checked,
                    };
                  } else {
                    temp[index] = {
                      ...temp[index],
                      meal_type: "",
                      is_included: ev.target.checked,
                    };
                  }
                  setValue("subscription", temp);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
