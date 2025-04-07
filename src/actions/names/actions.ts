"use server";

import { formSchema } from "@/components/submit-name-form";
import { prisma } from "@/lib/db/prisma";
import { NameWithNicknames } from "@/lib/utils/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "better-auth";
import * as z from "zod";

type NameQueryResult = {
  data: NameWithNicknames[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export async function addName(
  values: z.infer<typeof formSchema>,
  user: User | null,
) {
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
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred. Please try again later.";

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        errorMessage = `The name "${values.name}" already exists in the database.`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { ok: false, message: errorMessage };
  }
}

export async function getRecentlyAdded(): Promise<NameWithNicknames[] | []> {
  try {
    const names = await prisma.name.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        nicknames: {
          include: {
            nickname: true,
          },
        },
      },
      take: 3,
    });

    return names;
  } catch {
    return [];
  }
}

export async function getAllNames(
  currentPage: number,
  pageSize: number,
  searchTerm: string,
  orderBy: "name" | "createdAt" | "likes",
  gender: "all" | "MALE" | "FEMALE" | "UNISEX",
): Promise<NameQueryResult | null> {
  try {
    // 1. Order by clause
    let orderByClause = {};
    if (orderBy === "likes") {
      orderByClause = {
        likes: {
          _count: "desc",
        },
      };
    } else if (orderBy === "createdAt") {
      orderByClause = {
        createdAt: "desc",
      };
    } else if (orderBy === "name") {
      orderByClause = {
        name: "asc",
      };
    }

    // 2. Where clause with dynamic conditions
    const whereClause: Record<string, object> = {};

    if (gender && gender !== "all") {
      whereClause.gender = {
        equals: gender,
      };
    }

    if (searchTerm && searchTerm.trim() !== "") {
      whereClause.name = {
        contains: searchTerm.trim(),
        mode: "insensitive",
      };
    }

    // 3. Fetch data
    const [totalCount, names] = await Promise.all([
      prisma.name.count({
        where: whereClause,
      }),
      prisma.name.findMany({
        where: whereClause,
        include: {
          nicknames: {
            include: {
              nickname: true,
            },
          },
        },
        orderBy: orderByClause,
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }) as Promise<NameWithNicknames[]>,
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: names,
      totalCount,
      totalPages,
      currentPage,
      pageSize,
    };
  } catch {
    return null;
  }
}

export async function getFeaturedName(): Promise<NameWithNicknames | null> {
  try {
    // Get today's date string (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];
    const allNames = await prisma.name.findMany({
      select: {
        id: true,
      },
    });

    if (!allNames.length) return null;

    // Use a deterministic hash to pick same name every day
    const hash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const index = hash % allNames.length;

    const featuredName = await prisma.name.findUnique({
      where: {
        id: allNames[index].id,
      },
      include: {
        nicknames: {
          include: {
            nickname: true,
          },
        },
      },
    });

    return featuredName;
  } catch {
    return null;
  }
}
