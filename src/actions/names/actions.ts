"use server";

import { prisma } from "@/lib/db/prisma";
import { User } from "better-auth";

export async function addName(values: any, user: User | null) {
  if (!user) {
    return { ok: false, message: "You need to be logged in to add a name." };
  }

  try {
    const [userExists, nameExists] = await Promise.all([
      prisma.user.findUnique({ where: { id: user.id } }),
      prisma.name.findUnique({ where: { name: values.name } }),
    ]);

    if (!userExists) {
      return {
        ok: false,
        message: "User account not found. Please log in again.",
      };
    }

    if (nameExists) {
      return {
        ok: false,
        message: `The name "${values.name}" has already been added.`,
      };
    }

    await prisma.name.create({
      data: {
        name: values.name,
        gender: values.gender,
        nicknames: {
          create:
            values.nicknames?.map((nickname: string) => ({
              nickname: {
                connectOrCreate: {
                  where: { nickname },
                  create: { nickname },
                },
              },
            })) || [],
        },
        meaning: values.meaning || null,
        additionalInfo: values.additionalInfo || null,
        addedBy: { connect: { id: user.id } },
      },
    });

    return {
      ok: true,
      message: `The name "${values.name}" has been added successfully. Thank you for your contribution!`,
    };
  } catch (error: any) {
    let errorMessage = "An unexpected error occurred. Please try again later.";
    if (error.code === "P2002") {
      errorMessage = `The name "${values.name}" already exists in the database.`;
    }

    return { ok: false, message: errorMessage };
  }
}
