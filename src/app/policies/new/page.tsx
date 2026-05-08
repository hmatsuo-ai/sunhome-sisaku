"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PolicyForm } from "@/components/policies/PolicyForm";
import type { PolicyInput } from "@/components/policies/types";

export default function NewPolicyPage() {
  const router = useRouter();

  async function handleSubmit(payload: PolicyInput) {
    const response = await fetch("/api/policies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("施策の保存に失敗しました。");
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-xl border border-blue-100 bg-white p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-950">新規施策の作成</h1>
          <Link
            href="/"
            className="rounded-md border border-blue-200 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-50"
          >
            一覧へ戻る
          </Link>
        </div>
        <PolicyForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
