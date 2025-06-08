import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/lib/helpers/getUserSession";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getUserSession();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 },
      );
    }

    // Get like count for the name
    const likeCount = await prisma.nameLike.count({
      where: { nameId: id },
    });

    // Check if current user liked the name
    let likedByCurrentUser = false;
    if (session?.user?.id) {
      const userLike = await prisma.nameLike.findFirst({
        where: {
          nameId: id,
          userId: session.user.id,
        },
      });
      likedByCurrentUser = !!userLike;
    }

    return NextResponse.json({
      likeCount,
      likedByCurrentUser,
    });
  } catch (error) {
    console.error("Error in GET /api/name/[id]/getLikeInfo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
