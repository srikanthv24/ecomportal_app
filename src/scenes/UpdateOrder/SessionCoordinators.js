import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { SESSION_TYPES } from "../../utils/constants";

const SessionCordinator = ({
    sessionCodes,
    sessions
  }) => {
    
  return (
    <>
      {sessionCodes.map((sessionCode) => (
          <div className="mealPlannerCheck">
            <Form.Check
              type="checkbox"
              checked={sessions?.includes(sessionCode)}
              name={sessionCode}
              label={SESSION_TYPES[sessionCode]}
              disabled
            />
          </div>
        )
      )}
    </>
  );
};

export default SessionCordinator;