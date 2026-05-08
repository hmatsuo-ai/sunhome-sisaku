"use client";

import Link from "next/link";
import { PolicyComments } from "@/components/policies/PolicyComments";
import type { Policy } from "./types";

type PolicyDetailProps = {
  policy: Policy | null;
  onBackToList: () => void;
};

const priorityLabel: Record<Policy["priority"], string> = {
  HIGH: "高",
  MEDIUM: "中",
  LOW: "低",
};

const statusLabel: Record<Policy["status"], string> = {
  TODO: "未着手",
  IN_PROGRESS: "進行中",
  DONE: "完了",
};

export function PolicyDetail({ policy, onBackToList }: PolicyDetailProps) {
  if (!policy) {
    return (
      <section className="flex flex-1 items-center justify-center bg-stone-200/50 p-6 text-stone-600">
        左の一覧から施策を選択してください。
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col bg-stone-200/50 p-5 md:p-8">
      <button
        type="button"
        onClick={onBackToList}
        className="mb-4 w-fit rounded-md border border-stone-300 bg-stone-100 px-3 py-1.5 text-sm text-stone-800 md:hidden"
      >
        一覧に戻る
      </button>

      <div className="rounded-xl border border-stone-300/80 bg-stone-50/95 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold text-stone-900">
          {policy.name.trim() || "（名称未設定）"}
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          最終更新日: {new Date(policy.updatedAt).toLocaleDateString("ja-JP")}
        </p>
        <div className="mt-4">
          <Link
            href={`/policies/${policy.id}/edit`}
            className="inline-flex rounded-md bg-stone-700 px-3 py-1.5 text-sm font-medium text-stone-50 hover:bg-stone-800"
          >
            編集
          </Link>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <DetailItem label="依頼者の名前" value={policy.requesterName} />
          <DetailItem label="担当者" value={policy.ownerName} />
          <DetailItem label="優先順位" value={priorityLabel[policy.priority]} />
          <DetailItem label="ステータス" value={statusLabel[policy.status]} />
          <DetailItem label="予想工期" value={policy.estimatedDuration} />
          <DetailItem label="実際の工期" value={policy.actualDuration} />
        </dl>

        <div className="mt-6 space-y-4">
          <LongText label="これまでの問題点" value={policy.pastIssues} />
          <LongText label="システムの内容" value={policy.systemDescription} />
          <LongText label="施策による効果" value={policy.effect} />
          <LongText label="備考" value={policy.notes} />
        </div>

        <PolicyComments key={policy.id} policyId={policy.id} />
      </div>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  const empty = value.trim() === "";
  return (
    <div className="rounded-lg border border-stone-300/60 bg-stone-200/40 p-3">
      <dt className="text-xs font-medium tracking-wide text-stone-600">{label}</dt>
      <dd
        className={`mt-1 text-sm ${empty ? "text-stone-400 italic" : "text-stone-800"}`}
      >
        {empty ? "—" : value}
      </dd>
    </div>
  );
}

function LongText({ label, value }: { label: string; value: string }) {
  const empty = value.trim() === "";
  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-800">{label}</h3>
      <p
        className={`mt-1 whitespace-pre-wrap rounded-lg border border-stone-300/60 bg-stone-100/80 p-3 text-sm leading-6 ${
          empty ? "text-stone-400 italic" : "text-stone-800"
        }`}
      >
        {empty ? "—" : value}
      </p>
    </div>
  );
}
