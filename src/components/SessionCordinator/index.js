import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { SESSION_TYPES } from "../../utils/constants";

const getSessionCheckBoxes = (
  sessionCodes,
  onChange,
  selectedSessions,
  disabled
) => {
  return sessionCodes.map((sessionCode, index) => {
    return (
      <div className="mealPlannerCheck vl-checkbox-custom">
        <Form.Check
          type="checkbox"
          checked={selectedSessions?.includes(sessionCode)}
          name={sessionCode}
          label={SESSION_TYPES[sessionCode]}
          onClick={onChange}
          id={`session_checkbox_${index}`}
          disabled={disabled}
        />
      </div>
    );
  });
};

const SessionCordinator = React.memo(
  ({
    withDate,
    sessionCodes,
    onSessionChange,
    selectedSessions,
    disabled = false,
  }) => {
    const [sessions, setSessions] = useState(
      selectedSessions ? selectedSessions : []
    );
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
          : getSessionCheckBoxes(
              sessionCodes,
              onChange,
              selectedSessions,
              disabled
            )}
      </>
    );
  }
);

export default SessionCordinator;
