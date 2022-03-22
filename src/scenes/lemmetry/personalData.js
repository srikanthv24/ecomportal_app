import React from "react";
import Select from "react-select";

export const PersonalData = () => {
  const dispatch = useDispatch();
  const [genderOptions, setGenderOptions] = useState([]);
  const customerValues = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getGender());
  }, []);

  useEffect(() => {
    customerValues &&
      Object.keys(customerValues.genderList).length &&
      customerValues.genderList.__type.enumValues.map((option) => {
        temp3.push({
          label: option.name,
          value: option.name,
        });
      });
    setGenderOptions(temp3);
  }, [customerValues]);

  return (
    <Form style={{ background: "rgb(249, 243, 223)" }}>
      <Select
        name="gender"
        placeholder="select gender"
        options={genderOptions}
        className="mb-3 text-start"
      />
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Age" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Weight (in kgs)" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Height (in cms)" required />
      </Form.Group>
    </Form>
  );
};
