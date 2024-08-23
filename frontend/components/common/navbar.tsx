"use client";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import LoginButton from "./login/loginbutton";

export default function NavBar() {
  return (
    <Flex
      flexDirection="row"
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="black"
      borderBottom="gray"
      justify="space-between"
      paddingY={4}
      paddingX={4}
    >
      {/* Logo on the left */}
      <Link
        href="/"
        className="kenneyblocks"
        fontSize="2xl"
        fontWeight="bold"
        color="white"
      >
        Voxellary
      </Link>

      {/* Menu on the right */}
      <HStack as="nav" spacing={3}>
        <LoginButton />
        <Button size="lg">Upload Image</Button>
      </HStack>
    </Flex>
  );
}
