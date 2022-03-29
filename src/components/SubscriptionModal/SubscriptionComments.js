import Form from "react-bootstrap/Form";
import React from "react";

const SucscriptionComments = React.memo(({ onCommentsChange }) => (
  <Form.Control
    as="textarea"
    rows={3}
    onChange={onCommentsChange}
    className="my-2"
  />
));

export default SucscriptionComments;
