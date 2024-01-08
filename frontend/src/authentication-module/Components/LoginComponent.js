import {
  FormControl,
  Stack,
  Box,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginComponent = () => {
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlePassword = () => setShow(!show);

  const toast = useToast();

  const history = useNavigate();
  const goToForgottenPasswordPage = () => history.push("/forgottenPassword");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    setIsLoading(true);
    if (!username || !password) {
      toast({
        title: "Error",
        description: "You have to fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/user/login",
        {
          username: username,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      console.log(data);
      localStorage.setItem("loginUserData", JSON.stringify(data));
      history.push("/home");
    } catch {
      toast({
        title: "Error",
        description: "Fatal authentication",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setIsLoading(false);
  };

  return (
    <Stack spacing={4} align="center" width={600}>
      <FormControl isRequired>
        <FormLabel color={"white"}>e-mail address or username</FormLabel>
        <Input
          color={"white"}
          placeholder="enter your e-mail address or username"
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl isRequired>
        <FormLabel color={"white"}>password</FormLabel>
        <InputGroup>
          <Input
            color={"white"}
            type={show ? "text" : "password"}
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement>
            <Button
              background="blue.300"
              onClick={handlePassword}
              title={show ? "hide" : "show"}
            >
              {show ? "🙉" : "🙈"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isLoading={isLoading}
        width={40}
        background="blue.300"
        _hover={{ background: "blue.500" }}
        onClick={logIn}
      >
        Log In!
      </Button>

      <Box display="flex">
        <FormLabel color={"white"}>If you forgot password click here</FormLabel>
        <Button
          marginLeft={5}
          onClick={goToForgottenPasswordPage}
          background="blue.300"
        >
          :)
        </Button>
      </Box>
    </Stack>
  );
};

export default LoginComponent;
