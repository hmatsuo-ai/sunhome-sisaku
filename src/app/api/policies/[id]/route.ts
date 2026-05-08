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

  const policy = await prisma.policy.findUnique({
    where: { id: policyId },
  });

  if (!policy) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(policy);
}
