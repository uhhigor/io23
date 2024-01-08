import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import EditFieldComponent from "./EditFieldComponent";
import axios from "axios";
import { useState } from "react";

const UserInfoComponent = () => {
  const toast = useToast();
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("loginUserData")).username
  );

  const updateUserData = async () => {
    console.log(username);
    if (
      username != JSON.parse(localStorage.getItem("loginUserData")).username
    ) {
      const { data } = await axios.put(
        `/api/user/updateUser/${
          JSON.parse(localStorage.getItem("loginUserData")).user_id
        }`,
        { username }
      );
      console.log(data);
      toast({
        title: "Success",
        description: "User credentials updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("loginUserData", JSON.stringify(data));
    }
  };

  return (
    <Stack>
      <EditFieldComponent
        value={username}
        setValue={setUsername}
      ></EditFieldComponent>
      <Button onClick={updateUserData}>confirm changes</Button>
    </Stack>
  );
};

export default UserInfoComponent;
