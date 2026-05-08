"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PolicyForm } from "@/components/policies/PolicyForm";
import type { Policy, PolicyInput } from "@/components/policies/types";

export default function EditPolicyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [policy, setPolicy] = useState<Policy | null>(null);

  useEffect(() => {
    const loadPolicy = async () => {
      const response = await fetch(`/api/policies/${params.id}`, { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as Policy;
      setPolicy(data);
    };

    void loadPolicy();
  }, [params.id]);

  async function handleSubmit(payload: PolicyInput) {
    const response = await fetch("/api/policies", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, id: Number(params.id) }),
    });

    if (!response.ok) {
      throw new Error("更新に失敗しました。");
    }

    router.push("/");
  }

  if (!policy) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-gray-500">
          読み込み中...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[1.375rem] font-semibold text-gray-900">施策の編集</h1>
          <Link
            href="/"
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
          >
            一覧へ戻る
          </Link>
        </div>

        <PolicyForm
          initialValue={{
            name: policy.name,
            requesterName: policy.requesterName,
            ownerName: policy.ownerName,
            priority: policy.priority,
            status: policy.status,
            pastIssues: policy.pastIssues,
            systemDescription: policy.systemDescription,
            effect: policy.effect,
            estimatedDuration: policy.estimatedDuration,
            actualDuration: policy.actualDuration,
            notes: policy.notes,
          }}
          submitLabel="更新を保存"
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
