import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const EditFieldComponent = ({ value, setValue }) => {
  const [isDisabled, setIsDisabeld] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Input
        color={"white"}
        isDisabled={isDisabled}
        placeholder={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></Input>
      <Button
        onClick={() => {
          setIsDisabeld(!isDisabled);
        }}
      >
        ✏️
      </Button>
    </div>
  );
};

export default EditFieldComponent;
