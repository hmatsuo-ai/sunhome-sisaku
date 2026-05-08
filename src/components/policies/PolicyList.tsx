"use client";

import type { Policy } from "./types";

type PolicyListProps = {
  policies: Policy[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onCreate: () => void;
};

const statusStyle: Record<Policy["status"], string> = {
  TODO: "bg-gray-400",
  IN_PROGRESS: "bg-[#1a73e8]",
  DONE: "bg-[#1e8e3e]",
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
    <aside className="w-full border-r border-[var(--border)] bg-[var(--surface)] md:w-80">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3.5">
        <h2 className="text-[1.0625rem] font-semibold text-gray-900">施策一覧</h2>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-lg bg-[var(--accent)] px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--accent-hover)] active:opacity-90"
        >
          新規作成
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {policies.map((policy) => (
          <li key={policy.id}>
            <button
              type="button"
              onClick={() => onSelect(policy.id)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50 ${
                selectedId === policy.id ? "bg-blue-50/90" : ""
              }`}
            >
              <span
                className={`h-2.5 w-2.5 flex-none rounded-full ${statusStyle[policy.status]}`}
              />
              <span className="min-w-0 flex-1 truncate font-medium text-gray-900">
                {policy.name.trim() || "（名称未設定）"}
              </span>
              <span className="text-xs text-gray-500">
                {statusLabel[policy.status]}
              </span>
            </button>
          </li>
        ))}
        {policies.length === 0 && (
          <li className="px-4 py-8 text-sm text-gray-500">
            まだ施策がありません。新規作成してください。
          </li>
        )}
      </ul>
    </aside>
  );
}
