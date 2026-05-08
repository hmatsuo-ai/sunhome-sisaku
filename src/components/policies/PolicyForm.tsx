"use client";

import { useState } from "react";
import type { Client, PolicyInput, PriorityValue, StatusValue } from "./types";

type PolicyFormProps = {
  onSubmit: (payload: PolicyInput) => Promise<void>;
  initialValue?: PolicyInput;
  submitLabel?: string;
  clients?: Client[];
};

const defaultValue: PolicyInput = {
  clientId: null,
  name: "",
  requesterName: "",
  ownerName: "",
  priority: "MEDIUM",
  status: "TODO",
  pastIssues: "",
  systemDescription: "",
  effect: "",
  estimatedDuration: "",
  actualDuration: "",
  notes: "",
};

export function PolicyForm({
  onSubmit,
  initialValue,
  submitLabel = "施策を保存",
  clients = [],
}: PolicyFormProps) {
  const [form, setForm] = useState<PolicyInput>(initialValue ?? defaultValue);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
      if (!initialValue) {
        setForm(defaultValue);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="施策の名前" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
      <SelectField
        label="クライアント"
        value={form.clientId === null ? "" : String(form.clientId)}
        options={[
          { value: "", label: "未選択" },
          ...clients.map((client) => ({
            value: String(client.id),
            label: client.name,
          })),
        ]}
        onChange={(v) =>
          setForm({
            ...form,
            clientId: v === "" ? null : Number(v),
          })
        }
      />
      <Field
        label="依頼者の名前"
        value={form.requesterName}
        onChange={(v) => setForm({ ...form, requesterName: v })}
      />
      <Field label="担当者" value={form.ownerName} onChange={(v) => setForm({ ...form, ownerName: v })} />
      <SelectField
        label="優先順位"
        value={form.priority}
        options={[
          { value: "HIGH", label: "高" },
          { value: "MEDIUM", label: "中" },
          { value: "LOW", label: "低" },
        ]}
        onChange={(v) => setForm({ ...form, priority: v as PriorityValue })}
      />
      <SelectField
        label="ステータス"
        value={form.status}
        options={[
          { value: "TODO", label: "未着手" },
          { value: "IN_PROGRESS", label: "進行中" },
          { value: "DONE", label: "完了" },
        ]}
        onChange={(v) => setForm({ ...form, status: v as StatusValue })}
      />
      <TextArea
        label="これまでの問題点"
        value={form.pastIssues}
        onChange={(v) => setForm({ ...form, pastIssues: v })}
      />
      <TextArea
        label="システムの内容"
        value={form.systemDescription}
        onChange={(v) => setForm({ ...form, systemDescription: v })}
      />
      <TextArea label="施策による効果" value={form.effect} onChange={(v) => setForm({ ...form, effect: v })} />
      <Field
        label="予想工期"
        value={form.estimatedDuration}
        onChange={(v) => setForm({ ...form, estimatedDuration: v })}
      />
      <Field
        label="実際の工期"
        value={form.actualDuration}
        onChange={(v) => setForm({ ...form, actualDuration: v })}
      />
      <TextArea label="備考" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} />

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-[var(--accent)] px-4 py-2.5 font-medium text-white shadow-sm hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
      >
        {submitting ? "保存中..." : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-800">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-[var(--surface)] px-3 py-2.5 text-gray-900 outline-none transition-shadow focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-800">{label}</span>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-lg border border-gray-200 bg-[var(--surface)] px-3 py-2.5 text-gray-900 outline-none transition-shadow focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-800">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-[var(--surface)] px-3 py-2.5 text-gray-900 outline-none transition-shadow focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
