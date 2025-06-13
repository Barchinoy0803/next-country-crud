"use server";
import { revalidateTag } from "next/cache";
import { Country } from "../types";

const base_url = 'https://682f107d746f8ca4a47fa71c.mockapi.io/students'

export const getCountries = async () => {
  const res = await fetch(base_url, {
    next: { tags: ['country_list'] },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resdata = await res.json();
  return resdata;
};

export const createCountry = async (data: Country) => {
  const res = await fetch(base_url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
  const resdata = await res.json();
  return resdata;
}

export const editCountry = async (data: Country) => {
  const res = await fetch(`${base_url}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resdata = await res.json();
  return resdata;
};

export const deleteCountry = async (id: string) => {
  const res = await fetch(`${base_url}/${id}`, {
    method: "DELETE",
  });
  revalidateTag("country_list");  
  return res.json();
};
