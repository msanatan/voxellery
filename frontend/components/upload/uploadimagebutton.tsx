import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export default function UploadImageButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
      }
    }
  }

  return (
    <>
      <Button size={["sm", "lg"]} onClick={onOpen}>
        Upload Image
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "md"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a New Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" type="text" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Alt Text</FormLabel>
              <Input name="altText" type="text" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                display="none"
                id="file-input"
              />
            </FormControl>
            <label htmlFor="file-input">
              <Button as="span" colorScheme="blue" cursor="pointer">
                Choose Image
              </Button>
            </label>
            {selectedImage && (
              <Box mt={4}>
                <Image
                  src={selectedImage}
                  alt="Selected Image"
                  boxSize="150px"
                  objectFit="cover"
                />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Center w="100%" mt={4}>
              <Button colorScheme="teal" mr={3}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
