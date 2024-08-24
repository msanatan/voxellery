"use client";
import Artwork from "@/components/gallery/artwork";
import { getArtworks } from "@/services/artworks";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  async function getAllArtworks() {
    try {
      const response = await getArtworks();
      setArtworks(response.data);
    } catch (error) {
      console.error(`Got this error\n${error}`);
    }
  }

  useEffect(() => {
    getAllArtworks();
  }, []);

  return (
    <SimpleGrid columns={[1, 3]} spacing={[4, 8, 32]} px={[4, 8, 32]} mt={4}>
      {artworks.map((artwork) => {
        return (
          <Artwork
            key={artwork.id}
            title={artwork.title}
            altText={artwork.alt_text}
            url={artwork.url}
            username={artwork.user}
          />
        );
      })}
    </SimpleGrid>
  );
}
