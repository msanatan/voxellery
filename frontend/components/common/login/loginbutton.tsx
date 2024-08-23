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

export default function LoginButton() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="lg">Login</Button>
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
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Button mt={4} colorScheme="teal">
                  Submit
                </Button>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" name="username" />
                  <FormHelperText>
                    This is how users will see you
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" name="confirmPassword" />
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
