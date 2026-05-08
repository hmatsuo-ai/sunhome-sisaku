"use client";

import type { Policy } from "./types";

type PolicyListProps = {
  policies: Policy[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onCreate: () => void;
};

const statusStyle: Record<Policy["status"], string> = {
  TODO: "bg-stone-500",
  IN_PROGRESS: "bg-sky-800",
  DONE: "bg-emerald-800",
};

const statusLabel: Record<Policy["status"], string> = {
  TODO: "未着手",
  IN_PROGRESS: "進行中",
  DONE: "完了",
};

export function PolicyList({
  policies,
  selectedId,
  onSelect,
  onCreate,
}: PolicyListProps) {
  return (
    <aside className="w-full border-r border-stone-300/70 bg-stone-100/90 md:w-80">
      <div className="flex items-center justify-between border-b border-stone-300/70 px-4 py-3">
        <h2 className="text-lg font-semibold text-stone-800">施策一覧</h2>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-md bg-stone-700 px-3 py-1.5 text-sm font-medium text-stone-50 hover:bg-stone-800"
        >
          新規作成
        </button>
      </div>
      <ul className="divide-y divide-stone-300/50">
        {policies.map((policy) => (
          <li key={policy.id}>
            <button
              type="button"
              onClick={() => onSelect(policy.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-stone-200/70 ${
                selectedId === policy.id ? "bg-stone-200/90" : ""
              }`}
            >
              <span
                className={`h-2.5 w-2.5 flex-none rounded-full ${statusStyle[policy.status]}`}
              />
              <span className="min-w-0 flex-1 truncate font-medium text-stone-900">
                {policy.name.trim() || "（名称未設定）"}
              </span>
              <span className="text-xs text-stone-600">
                {statusLabel[policy.status]}
              </span>
            </button>
          </li>
        ))}
        {policies.length === 0 && (
          <li className="px-4 py-8 text-sm text-stone-600">
            まだ施策がありません。新規作成してください。
          </li>
        )}
      </ul>
    </aside>
  );
}
