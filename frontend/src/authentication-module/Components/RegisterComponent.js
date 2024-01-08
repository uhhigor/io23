import {
  Stack,
  FormControl,
  Input,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [roleName, setRoleName] = useState(
    JSON.parse(localStorage.getItem("loginUserData")).role
  );
  const [email, setEmail] = React.useState();
  const [username, setUserame] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmedPassword, setConfirmedPassword] = React.useState();
  const [role, setChildUserRole] = useState("");
  const [containerName, setContainerName] = useState();
  const [showChildRole, setShowChildRole] = useState(true);

  const history = useNavigate();

  const toast = useToast();

  useEffect(() => {
    mapRole();
  }, []);

  const mapRole = () => {
    if (roleName === "ROLE_ADMIN") setChildUserRole("ROLE_DIRECTOR");
    else if (roleName === "ROLE_DIRECTOR") setChildUserRole("ROLE_TEACHER");
    else if (roleName === "ROLE_TEACHER") setChildUserRole("ROLE_STUDENT");
    else if (roleName === "ROLE_STUDENT") setShowChildRole(false);
  };

  const registerNewUser = async () => {
    if (!email || !username || !password) {
      toast({
        title: "Error",
        description: "You have to fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    } else if (password !== confirmedPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/user/register",
        {
          email,
          username,
          password,
          role,
        },
        config
      );
      console.log(data);
      if (roleName === "ROLE_DIRECTOR") {
        await axios.post(
          "api/user/class",
          {
            className: containerName,
            user_id: data.user_id,
          },
          config
        );
      }

      toast({
        title: "Success",
        description: "Account created!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create an account",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    console.log("done");
  };

  const [show, setShow] = React.useState(false);
  const handlePassword = () => setShow(!show);

  const [show1, setShow1] = React.useState(false);
  const handlePassword1 = () => setShow1(!show1);

  return (
    <Stack spacing={3} align="center" width={600}>
      <h1>Current user role: {roleName}</h1>
      <FormControl isRequired>
        <FormLabel>E-mail address</FormLabel>
        <Input
          placeholder="enter your e-mail address"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="enter your name"
          onChange={(e) => setUserame(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            type={show ? "text" : "password"}
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

      <FormControl isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm your password"
            type={show1 ? "text" : "password"}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          ></Input>
          <InputRightElement>
            <Button
              background="blue.300"
              onClick={handlePassword1}
              title={show1 ? "hide" : "show"}
            >
              {show1 ? "🙉" : "🙈"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {roleName === "ROLE_DIRECTOR" && (
        <FormControl isRequired>
          <FormLabel>Class Name</FormLabel>
          <Input
            placeholder="enter class name"
            onChange={(e) => setContainerName(e.target.value)}
          ></Input>
        </FormControl>
      )}
      {showChildRole && <FormLabel>Registered user's role: {role}</FormLabel>}

      <Button background="blue.300" onClick={registerNewUser}>
        Create account!
      </Button>
    </Stack>
  );
};

export default RegisterComponent;
