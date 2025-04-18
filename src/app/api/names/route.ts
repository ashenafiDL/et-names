import { getNameByName } from "@/actions/names/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  const data = await getNameByName(name || "");

  return NextResponse.json(data);
}
