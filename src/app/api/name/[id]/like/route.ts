import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/lib/helpers/getUserSession";
import { NextResponse } from "next/server";

export async function POST({ params }: { params: Promise<{ id: string }> }) {
  const session = await getUserSession();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized: not logged in" },
      { status: 401 },
    );
  }

  const { id } = await params;

  // Check if the name exists
  const name = await prisma.name.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!name) {
    return NextResponse.json({ message: "Name not found" }, { status: 404 });
  }

  // Toggle like: remove if exists, otherwise create
  const existingLike = await prisma.nameLike.findFirst({
    where: {
      userId: session.user.id,
      nameId: id,
    },
  });

  if (existingLike) {
    await prisma.nameLike.delete({ where: { id: existingLike.id } });
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
}
