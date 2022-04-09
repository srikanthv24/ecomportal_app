import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { SESSION_TYPES } from "../../utils/constants";

const getSessionCheckBoxes = (sessionCodes, onChange, selectedSessions) => {
  return sessionCodes.map((sessionCode) => {
    return (
      <div className="mealPlannerCheck vl-checkbox-custom">
        <Form.Check
          type="checkbox"
          checked={selectedSessions?.includes(sessionCode)}
          name={sessionCode}
          label={SESSION_TYPES[sessionCode]}
          onChange={onChange}
        />
      </div>
    );
  });
};

const SessionCordinator = React.memo(
  ({ withDate, sessionCodes, onSessionChange, selectedSessions }) => {
    const [sessions, setSessions] = useState(
      selectedSessions ? selectedSessions : []
    );
    console.log("sessions: " + JSON.stringify(sessions));
    const onChange = (e) => {
      const selectedCode = e.target.name;
      const updatedSessionCodes = sessions?.includes(selectedCode)
        ? sessions?.filter((code) => code !== selectedCode)
        : [...sessions, selectedCode];
      setSessions(updatedSessionCodes);
      onSessionChange(updatedSessionCodes);
    };
    return (
      <>
        {withDate
          ? null
          : getSessionCheckBoxes(sessionCodes, onChange, selectedSessions)}
      </>
    );
  }
);

export default SessionCordinator;
