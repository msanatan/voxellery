import { login } from "@/services/accounts";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabIndicator,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export default function LoginButton() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onLoginHandler(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    try {
      const response = await login(email, password);
      console.log(response);
    } catch (error) {
      console.error(`Got this error\n${error}`);
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setConfirmPassword(event.target.value);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button size={["sm", "lg"]}>Login</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Tabs
            isFitted
            variant="enclosed"
            size="md"
            align="center"
            bg="gray.50"
          >
            <TabList>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <FormControl mt={4}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>

                <Button mt={4} colorScheme="teal" onClick={onLoginHandler}>
                  Submit
                </Button>
              </TabPanel>
              <TabPanel>
                <FormControl mt={4}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <FormHelperText>
                    This is how users will see you
                  </FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </FormControl>
                <Button mt={4} colorScheme="teal">
                  Submit
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
