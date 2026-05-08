import { NextResponse } from "next/server";
import { PolicyStatus, Priority } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type PolicyInput = {
  clientId: number | null;
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

function str(v: unknown): string {
  if (v == null) return "";
  return typeof v === "string" ? v : String(v);
}

function normalizePolicyPayload(raw: Partial<PolicyInput>): PolicyInput {
  const p = raw.priority;
  const s = raw.status;
  const clientIdRaw = raw.clientId;
  const clientId =
    typeof clientIdRaw === "number" && Number.isFinite(clientIdRaw)
      ? clientIdRaw
      : null;
  return {
    clientId,
    name: str(raw.name).trim(),
    requesterName: str(raw.requesterName).trim(),
    ownerName: str(raw.ownerName).trim(),
    priority:
      p === "HIGH" || p === "MEDIUM" || p === "LOW" ? p : Priority.MEDIUM,
    status:
      s === "TODO" || s === "IN_PROGRESS" || s === "DONE"
        ? s
        : PolicyStatus.TODO,
    pastIssues: str(raw.pastIssues),
    systemDescription: str(raw.systemDescription),
    effect: str(raw.effect),
    estimatedDuration: str(raw.estimatedDuration).trim(),
    actualDuration: str(raw.actualDuration).trim(),
    notes: str(raw.notes),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientIdParam = searchParams.get("clientId");
  const clientId = clientIdParam ? Number(clientIdParam) : null;

  const policies = await prisma.policy.findMany({
    where: Number.isFinite(clientId) ? { clientId } : undefined,
    include: {
      client: {
        select: { id: true, name: true },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(policies);
}

export async function POST(request: Request) {
  try {
    const raw = (await request.json()) as Partial<PolicyInput>;
    const data = normalizePolicyPayload(raw);

    const created = await prisma.policy.create({
      data,
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
    const data = normalizePolicyPayload(rest);
    const updated = await prisma.policy.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update policy", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = (await request.json()) as { id?: number };

    if (!payload.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.policy.delete({
      where: { id: payload.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete policy", detail: String(error) },
      { status: 500 },
    );
  }
}
