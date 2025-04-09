// app/item-list.tsx
"use client";

import {
  useOptimistic,
  useState,
  useRef,
  useEffect,
  useActionState,
} from "react";
import { useFormStatus } from "react-dom"; // formStatus ашиглахын тулд
import type { Item } from "../blog/lib/data";
import { addItemAction, type AddItemState } from "./actions";

// Submit товчны компонентыг салгаж гаргавал useFormStatus ашиглахад хялбар
function SubmitButton() {
  const { pending } = useFormStatus(); // Форм илгээгдэж буй эсэхийг шалгана

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
    >
      {pending ? "Нэмж байна..." : "Нэмэх"}
    </button>
  );
}

interface ItemListProps {
  initialItems: Item[];
}

export default function ItemList({ initialItems }: ItemListProps) {
  // useActionState: Формын төлөв, алдааг удирдах
  // Эхний утга нь { message: null, error: false } байна
  const [state, formAction] = useActionState<AddItemState, FormData>(
    addItemAction,
    { message: null, error: false }
  );

  // useOptimistic: UI-г түр шинэчлэх
  const [optimisticItems, addOptimisticItem] = useOptimistic<Item[], string>(
    initialItems,
    // Шинэчлэх функц: одоогийн state болон шинээр нэмэгдэх зүйлийг авна
    (currentState, newItemText) => [
      ...currentState,
      // Түр зуурын ID болон "Хүлээгдэж байна" гэсэн тексттэйгээр нэмнэ
      { id: Math.random(), text: `${newItemText} (Түр хүлээнэ үү...)` },
    ]
  );

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Форм амжилттай илгээгдсэний дараа input-г цэвэрлэх
  useEffect(() => {
    if (state.message && !state.error && state.timestamp) {
      // Амжилттай болсон үед формыг цэвэрлэнэ
      if (formRef.current) {
        formRef.current.reset();
      }
      // Дахин focus хийх (сонголтоор)
      // if(inputRef.current) {
      //     inputRef.current.focus();
      // }
    }
  }, [state]); // state өөрчлөгдөх бүрт шалгана

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Миний Жагсаалт</h1>

      {/* Форм */}
      <form
        ref={formRef}
        action={async (formData) => {
          const newItemText = formData.get("itemText") as string;
          if (!newItemText.trim()) {
            // Үйлчлүүлэгч талд энгийн шалгалт хийж болно
            // Гэхдээ гол шалгалт сервер талд хийгдэнэ
            return;
          }
          // Optimistic update-г эхлүүлнэ
          addOptimisticItem(newItemText);
          // Сервер үйлдлийг дуудна (useActionState-с авсан formAction)
          await formAction(formData);
        }}
        className="flex gap-2 mb-4"
      >
        <input
          ref={inputRef}
          type="text"
          name="itemText"
          placeholder="Шинэ зүйл нэмэх..."
          required
          className="flex-grow p-2 border rounded"
        />
        <SubmitButton /> {/* Тусдаа компонент болгосон товч */}
      </form>

      {/* Формын үр дүнгийн мессеж */}
      {state.message && (
        <p
          className={`mb-4 ${state.error ? "text-red-500" : "text-green-500"}`}
        >
          {state.message}
        </p>
      )}

      {/* Жагсаалт (OptimisticItems ашиглана) */}
      <ul className="list-disc pl-5 space-y-1">
        {optimisticItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
        {optimisticItems.length === 0 && <li>Жагсаалт хоосон байна.</li>}
      </ul>
    </div>
  );
}
