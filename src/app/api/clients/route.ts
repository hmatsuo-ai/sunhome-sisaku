import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { name?: string };
    const name = payload.name?.trim() ?? "";

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const created = await prisma.client.create({
      data: { name },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create client", detail: String(error) },
      { status: 500 },
    );
  }
}
