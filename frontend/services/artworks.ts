import backendApiClient from "@/utils/backendApiClient";

export function getArtworks() {
  return backendApiClient.get("/artworks/");
}
