import React from "react";
import {
  Box,
  Container,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import RegisterComponent from "../Components/RegisterComponent";
import LoginComponent from "../Components/LoginComponent";
import MainPage from "./mainPage";
const HomePage = () => {
  return (
    <Container maxWidth="xl" centerContent>
      <Box
        background="white"
        color="black"
        border="4px"
        display="flex"
        justifyContent="center"
        padding={3}
        marginTop={100}
        width={500}
        fontSize="20"
        borderRadius={8}
      >
        <Text fontSize={30}>Welcome to the greenchallenge</Text>
      </Box>
      <Box
        margin={6}
        background="#00264d"
        border="2px"
        padding="50px"
        borderColor="black"
        borderRadius={10}
      >
        <LoginComponent></LoginComponent>
        {/* <MainPage></MainPage> */}
        {/* {process.env.ADMIN == true ? (
          <LoginComponent />
        ) : (
          <Tabs isFitted variant="enclosed" color="white">
            <TabList>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>Login</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>
                Register as Administrator
              </Tab>
            </TabList>

            <TabPanels color="white" id="myTabPanel">
              <TabPanel>
                <LoginComponent />
              </TabPanel>
              <TabPanel>
                <RegisterComponent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )} */}

        {/* <RegisterComponent /> */}

        {/* <input
          placeholder="Login"
          color="pink"
          resize="none"
          size="xs"
          borderRadius={6}
          background="blue.200"
        />
        <input
          marginTop={4}
          placeholder="Password"
          resize="none"
          size="xs"
          background="blue.200"
          borderRadius={6}
        />
        <Button background="blue.200" marginLeft="35%" marginTop="4%">
          Log In!
        </Button> */}
      </Box>
    </Container>
  );
};

export default HomePage;
