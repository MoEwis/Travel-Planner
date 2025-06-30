"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";

export const reorderItem = async (tripId: string, newOrder: string[]) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not Authenticated");
  }
  await prisma.$transaction(
    newOrder.map((loactionId, key) => {
      return prisma.location.update({
        where: {
          id: loactionId,
        },
        data: {
          order: key,
        },
      });
    })
  );
};
