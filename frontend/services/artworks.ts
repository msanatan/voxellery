import backendApiClient from "@/utils/backendApiClient";

export function getArtworks() {
  return backendApiClient.get("/artworks/");
}

export function createArtwork(
  accessToken: string,
  title: string,
  altText: string,
  imageFile: File
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("alt_text", altText);
  formData.append("image", imageFile);

  return backendApiClient.post("/artworks/", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}
