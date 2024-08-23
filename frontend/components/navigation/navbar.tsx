"use client";
import { Flex, HStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import LoginButton from "../login/loginbutton";
import UploadImageButton from "../upload/uploadimagebutton";

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
        fontSize={["xl", "3xl"]}
        color="white"
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
      >
        Voxellary
      </Link>

      {/* Menu on the right */}
      <HStack as="nav" spacing={3}>
        <LoginButton />
        <UploadImageButton />
      </HStack>
    </Flex>
  );
}
