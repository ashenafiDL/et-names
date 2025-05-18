import { NameQueryResult, NameWithNicknames } from "../utils/types";
import { prisma } from "./prisma";

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

export async function getNameByName(
  name: string,
): Promise<NameWithNicknames | null> {
  try {
    const existingName = await prisma.name.findUnique({
      where: { name: name },
      include: {
        nicknames: {
          include: {
            nickname: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        addedBy: true,
      },
    });

    return existingName;
  } catch {
    return null;
  }
}
