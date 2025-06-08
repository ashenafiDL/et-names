import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/lib/helpers/getUserSession";
import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await getUserSession();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized: not logged in" },
        { status: 401 },
      );
    }

    const name = await prisma.name.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!name) {
      return NextResponse.json({ message: "Name not found" }, { status: 404 });
    }

    const like = await prisma.nameLike.findUnique({
      where: {
        userId_nameId: {
          userId: session.user.id,
          nameId: id,
        },
      },
    });

    if (like) {
      await prisma.nameLike.delete({
        where: {
          userId_nameId: {
            userId: session.user.id,
            nameId: id,
          },
        },
      });
      return NextResponse.json({ message: "Like removed" }, { status: 200 });
    } else {
      await prisma.nameLike.create({
        data: {
          userId: session.user.id,
          nameId: id,
        },
      });
      return NextResponse.json({ message: "Like created" }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to toggle like. Please try again." },
      { status: 500 },
    );
  }
}
