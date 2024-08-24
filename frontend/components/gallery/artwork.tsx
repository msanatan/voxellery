import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

type ArtworkProps = {
  title: string;
  altText: string;
  url: string;
  username?: string;
};

export default function Artwork({
  title,
  altText,
  url,
  username,
}: ArtworkProps) {
  return (
    <Card maxW="md">
      <CardBody>
        <Image
          src={url}
          alt={altText}
          borderRadius="lg"
          objectFit="cover"
          w={480}
          h={400}
        />
        <Stack mt="6" spacing="3" maxW={480}>
          <Heading as="h4" size="sm">
            {title}
          </Heading>
          <Text>
            Created by <strong>{username}</strong>
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
