import { client } from "@/api/client";
import type { Advert, CreateAdvertDto, Tags } from "./types";

const advertsUrl = "/v1/adverts";

export async function getAdverts() {
  const url = advertsUrl;
  const response = await client.get<Advert[]>(url);
  return response.data;
}

export async function getAdvert(advertId: string) {
  const url = `${advertsUrl}/${advertId}`;
  const response = await client.get<Advert>(url);
  return response.data;
}

export async function createAdvert(advertDto: CreateAdvertDto) {
  const url = advertsUrl;
  const response = await client.post<Advert>(url, advertDto, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function deleteAdvert(advertId: string) {
  const url = `${advertsUrl}/${advertId}`;
  const response = await client.delete<Advert>(url);
  return response.data;
}

export async function getTags() {
  const url = `${advertsUrl}/tags`;
  const response = await client.get<Tags>(url);
  return response.data;
}
