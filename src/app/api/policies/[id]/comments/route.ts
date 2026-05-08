import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const policyId = Number(id);

  if (Number.isNaN(policyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const exists = await prisma.policy.findUnique({
    where: { id: policyId },
    select: { id: true },
  });

  if (!exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const comments = await prisma.comment.findMany({
    where: { policyId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const policyId = Number(id);

  if (Number.isNaN(policyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const payload = (await request.json()) as {
    body?: string;
    authorName?: string | null;
  };

  const text = payload.body?.trim() ?? "";
  if (!text) {
    return NextResponse.json({ error: "body is required" }, { status: 400 });
  }

  const author = payload.authorName?.trim();
  const authorName = author && author.length > 0 ? author : null;

  const policy = await prisma.policy.findUnique({
    where: { id: policyId },
    select: { id: true },
  });
  if (!policy) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const created = await prisma.comment.create({
    data: {
      policyId,
      body: text,
      authorName,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
