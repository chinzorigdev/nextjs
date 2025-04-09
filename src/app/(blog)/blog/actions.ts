// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { addItem } from "../blog/lib/data";

// useActionState-д зориулсан Action State-ийн төрөл
export interface AddItemState {
  message: string | null;
  error: boolean;
  timestamp?: number; // State өөрчлөгдсөнийг илтгэх (useOptimistic-д хэрэгтэй)
}

export async function addItemAction(
  prevState: AddItemState,
  formData: FormData
): Promise<AddItemState> {
  const text = formData.get("itemText") as string;

  console.log("Server Action: addItemAction started for:", text);

  const result = await addItem(text);

  if (result.success) {
    revalidatePath("/"); // Cache-г цэвэрлэж, жагсаалтыг шинэчлэх
    console.log("Server Action: Success -", result.message);
    return { message: result.message, error: false, timestamp: Date.now() };
  } else {
    console.log("Server Action: Error -", result.message);
    return { message: result.message, error: true, timestamp: Date.now() };
  }
}
