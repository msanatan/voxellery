import { useAuth } from "@/hooks/useAuth";
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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { createArtwork } from "@/services/artworks";

export default function UploadImageButton() {
  const { isAuthenticated, accessToken } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");

  function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
    }
  }

  async function onUploadHandler() {
    if (selectedImage && accessToken) {
      try {
        const response = await createArtwork(
          accessToken,
          title,
          altText,
          selectedImage
        );
        console.log("Artwork uploaded:", response.data);
        onClose();
      } catch (error) {
        console.error("Error uploading artwork:", error);
      }
    }
  }

  return (
    <>
      <Tooltip
        hasArrow
        arrowSize={15}
        label="Login to upload"
        bg="gray.100"
        color="black"
        isDisabled={isAuthenticated}
      >
        <Button
          size={["sm", "lg"]}
          onClick={onOpen}
          isDisabled={!isAuthenticated}
        >
          Upload Image
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "md"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a New Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Alt Text</FormLabel>
              <Input
                name="altText"
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
              />
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
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                  boxSize="150px"
                  objectFit="cover"
                />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Center w="100%" mt={4}>
              <Button colorScheme="teal" mr={3} onClick={onUploadHandler}>
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
