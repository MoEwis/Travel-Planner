// lib/actions/add-location.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "travel-app",
      },
    }
  );

  const data = await res.json();
  if (!data || data.length === 0) {
    throw new Error("Location not found");
  }

  const { lat, lon } = data[0];
  return {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
  };
}

export async function addLocation(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const address = formData.get("address")?.toString();
  const tripId = formData.get("tripId")?.toString();

  if (!address || !tripId) throw new Error("Missing data");

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({ where: { tripId } });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}
