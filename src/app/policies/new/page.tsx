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
    <main className="min-h-screen bg-stone-200/80 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-xl border border-stone-300/80 bg-stone-50/95 p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-stone-900">新規施策の作成</h1>
          <Link
            href="/"
            className="rounded-md border border-stone-300 bg-stone-100/80 px-3 py-1.5 text-sm text-stone-800 hover:bg-stone-200/80"
          >
            一覧へ戻る
          </Link>
        </div>
        <PolicyForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
