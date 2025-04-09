// lib/data.ts
export interface Item {
  id: number;
  text: string;
}

let items: Item[] = [
  { id: 1, text: "Эхний зүйл" },
  { id: 2, text: "Хоёр дахь зүйл" },
];
let nextId = 3;

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getItems(): Promise<Item[]> {
  console.log("Fetching items...");
  await delay(1500); // 1.5 секунд хүлээлгэнэ (Suspense-г харуулахын тулд)
  console.log("Items fetched:", items);
  return [...items]; // Массивын хуулбарыг буцаана
}

export async function addItem(
  text: string
): Promise<{ success: boolean; message: string; newItem?: Item }> {
  console.log("Adding item:", text);
  await delay(1000); // 1 секунд хүлээлгэнэ (Сервер үйлдлийг симуляц хийх)

  if (!text.trim()) {
    console.log("Add item failed: Text is empty");
    return { success: false, message: "Текст хоосон байж болохгүй." };
  }

  const newItem: Item = { id: nextId++, text };
  items.push(newItem);
  console.log("Item added:", newItem);
  return { success: true, message: "Амжилттай нэмэгдлээ!", newItem };
}
