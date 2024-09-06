import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { SESSION_TYPES } from "../../utils/constants";

const SessionCordinatorToggle = React.memo(
  ({
    sessionCodes,
    enabledSessions,
    setSelectedSessionCode,
    selectedSessionCode,
  }) => {
    const onChange = (e) => {
      const selectedCode = e.target.name;
      setSelectedSessionCode(selectedCode);
    };

    return (
      <>
        {sessionCodes?.map((sessionCode, index) => {
          return enabledSessions?.includes(sessionCode) ? (
            <div className="mealPlannerCheck vl-checkbox-custom">
              <Form.Check
                type="checkbox"
                checked={selectedSessionCode === sessionCode}
                name={sessionCode}
                label={SESSION_TYPES[sessionCode]}
                onClick={onChange}
                id={`session_checkbox_${index}`}
                disabled={!enabledSessions?.includes(sessionCode)}
              />
            </div>
          ) : (
            <s>{SESSION_TYPES[sessionCode]}</s>
          );
        })}
      </>
    );
  }
);

export default SessionCordinatorToggle;
