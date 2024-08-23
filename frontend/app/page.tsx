import { Box, SimpleGrid } from "@chakra-ui/react";

export default function Home() {
  return (
    <SimpleGrid columns={[1, 3]} spacing={4} px={[4, 16]} mt={4}>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
    </SimpleGrid>
  );
}
