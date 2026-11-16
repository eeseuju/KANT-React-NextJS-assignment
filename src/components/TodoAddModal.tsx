"use client";

// [클라이언트 컴포넌트] 날짜·시간·내용까지 입력해 등록하는 모달. 브라우저 기본 <dialog>를 쓴다. (Esc 닫기, 포커스 가두기, 뒷배경 처리를 브라우저 몫)
import { useEffect, useRef } from "react";
import type { TodoFormValues } from "@/types/todo";
import TodoEditForm from "@/components/TodoEditForm";

type TodoAddModalProps = {
  initialValues: TodoFormValues;
  onSave: (values: TodoFormValues) => Promise<boolean>;
  onClose: () => void;
};

export default function TodoAddModal({
  initialValues,
  onSave,
  onClose,
}: TodoAddModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 화면에 나타나면 모달로 연다. (처음 한 번만 실행)
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  async function handleSave(values: TodoFormValues): Promise<boolean> {
    const saved = await onSave(values);
    if (saved) {
      onClose();
    }
    return saved;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="할 일 추가"
      onClose={onClose}
      // 뒷배경(dialog 자체)을 눌렀을 때만 닫는다. 안쪽 클릭은 target이 다르다.
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg p-0 backdrop:bg-black/40"
    >
      {/* 여백은 안쪽 div가 가진다. dialog에 padding을 주면 여백을 눌러도 배경 클릭으로 인식된다. */}
      <div className="p-6">
        <h2 className="mb-4 text-base font-medium">할 일 추가</h2>
        <TodoEditForm
          initialValues={initialValues}
          onSave={handleSave}
          onCancel={onClose}
        />
      </div>
    </dialog>
  );
}
