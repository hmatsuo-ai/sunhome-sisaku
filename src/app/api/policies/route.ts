import { NextResponse } from "next/server";
import { PolicyStatus, Priority } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type PolicyInput = {
  name: string;
  requesterName: string;
  ownerName: string;
  priority: Priority;
  status: PolicyStatus;
  pastIssues: string;
  systemDescription: string;
  effect: string;
  estimatedDuration: string;
  actualDuration: string;
  notes: string;
};

function validateRequiredFields(payload: Partial<PolicyInput>) {
  const requiredFields: (keyof PolicyInput)[] = [
    "name",
    "requesterName",
    "ownerName",
    "priority",
    "status",
    "pastIssues",
    "systemDescription",
    "effect",
    "estimatedDuration",
    "actualDuration",
    "notes",
  ];

  return requiredFields.filter((field) => !payload[field]);
}

export async function GET() {
  const policies = await prisma.policy.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(policies);
}

export async function POST(request: Request) {
  try {
    const payload: Partial<PolicyInput> = await request.json();
    const missing = validateRequiredFields(payload);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const created = await prisma.policy.create({
      data: payload as PolicyInput,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create policy", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = (await request.json()) as Partial<PolicyInput> & {
      id?: number;
    };

    if (!payload.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { id, ...rest } = payload;
    const updated = await prisma.policy.update({
      where: { id },
      data: rest,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update policy", detail: String(error) },
      { status: 500 },
    );
  }
}
