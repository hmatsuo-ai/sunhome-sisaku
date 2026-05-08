"use client";

import type { Policy } from "./types";

type PolicyListProps = {
  policies: Policy[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onCreate: () => void;
};

const statusStyle: Record<Policy["status"], string> = {
  TODO: "bg-slate-400",
  IN_PROGRESS: "bg-blue-500",
  DONE: "bg-green-500",
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
    <aside className="w-full border-r border-blue-100 bg-white md:w-80">
      <div className="flex items-center justify-between border-b border-blue-100 px-4 py-3">
        <h2 className="text-lg font-semibold text-blue-900">施策一覧</h2>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          新規作成
        </button>
      </div>
      <ul className="divide-y divide-blue-50">
        {policies.map((policy) => (
          <li key={policy.id}>
            <button
              type="button"
              onClick={() => onSelect(policy.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 ${
                selectedId === policy.id ? "bg-blue-50" : ""
              }`}
            >
              <span
                className={`h-2.5 w-2.5 flex-none rounded-full ${statusStyle[policy.status]}`}
              />
              <span className="min-w-0 flex-1 truncate font-medium text-blue-950">
                {policy.name}
              </span>
              <span className="text-xs text-slate-600">
                {statusLabel[policy.status]}
              </span>
            </button>
          </li>
        ))}
        {policies.length === 0 && (
          <li className="px-4 py-8 text-sm text-slate-500">
            まだ施策がありません。新規作成してください。
          </li>
        )}
      </ul>
    </aside>
  );
}
