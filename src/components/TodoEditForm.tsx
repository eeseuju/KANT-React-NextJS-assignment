"use client";

// [클라이언트 컴포넌트] 입력칸 상태(useState)가 필요하다.
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, SubmitEvent } from "react";
import type { TodoFormValues } from "@/types/todo";
import {
  CONTENT_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  validateTodoForm,
} from "@/lib/todos";

// 수정(목록 안)과 추가(모달)에서 같이 쓰는 입력 폼
type TodoEditFormProps = {
  initialValues: TodoFormValues;
  onSave: (values: TodoFormValues) => Promise<boolean>;
  onCancel: () => void;
};

export default function TodoEditForm({
  initialValues,
  onSave,
  onCancel,
}: TodoEditFormProps) {
  const id = useId();
  const [values, setValues] = useState<TodoFormValues>(initialValues);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  // 수정 폼이 열리면 제목 칸에 커서를 둔다. (처음 한 번만 실행)
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // 입력칸 하나의 값만 바꾼 새 객체를 상태에 넣기
  function handleChange(field: keyof TodoFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Escape") {
      onCancel();
    }
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = validateTodoForm(values);
    if (message) {
      setError(message);
      return;
    }

    setError("");
    setSaving(true);
    try {
      if (!(await onSave(values))) {
        setError("저장하지 못했습니다. 다시 시도하세요.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="space-y-3"
    >
      <div className="space-y-1">
        <label htmlFor={`${id}-title`} className="text-xs text-gray-500">
          제목
        </label>
        <input
          id={`${id}-title`}
          ref={titleRef}
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          maxLength={TITLE_MAX_LENGTH}
          className="field"
        />
      </div>

      <div className="flex gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <label htmlFor={`${id}-date`} className="text-xs text-gray-500">
            날짜
          </label>
          <input
            id={`${id}-date`}
            type="date"
            value={values.due_date}
            onChange={(e) => handleChange("due_date", e.target.value)}
            className="field"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <label htmlFor={`${id}-time`} className="text-xs text-gray-500">
            시간
          </label>
          <input
            id={`${id}-time`}
            type="time"
            value={values.due_time}
            onChange={(e) => handleChange("due_time", e.target.value)}
            className="field"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor={`${id}-content`} className="text-xs text-gray-500">
          내용
        </label>
        <textarea
          id={`${id}-content`}
          value={values.content}
          onChange={(e) => handleChange("content", e.target.value)}
          maxLength={CONTENT_MAX_LENGTH}
          rows={3}
          className="field"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="btn btn-outline btn-sm"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary btn-sm"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
