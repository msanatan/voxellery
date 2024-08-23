import Artwork from "@/components/gallery/artwork";
import { SimpleGrid } from "@chakra-ui/react";

export default function Home() {
  return (
    <SimpleGrid columns={[1, 3]} spacing={4} px={[4, 16]} mt={4}>
      <Artwork
        title="Test"
        altText="A test image"
        url="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        username="msanatan"
      />
    </SimpleGrid>
  );
}
