// app/actions.ts - Server Actions
"use server";

import { revalidatePath } from "next/cache";
import { sleep } from "../uos/utils";

export type User = {
  id: string;
  name: string;
  email: string;
};

// Mock database
let users: User[] = [
  { id: "1", name: "Bat", email: "bat@example.mn" },
  { id: "2", name: "Bold", email: "bold@example.mn" },
];

export async function getUsers(): Promise<User[]> {
  // Simulate network delay
  await sleep(1500);
  return users;
}

export async function addUser(
  prevState: { error?: string; success?: boolean },
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // Validation
    if (!name || !email) {
      throw new Error("Нэр болон и-мэйл хаяг оруулна уу");
    }

    if (email.indexOf("@") === -1) {
      throw new Error("Зөв и-мэйл хаяг оруулна уу");
    }

    // Simulate network delay
    await sleep(2000);

    // Add user
    const newUser = {
      id: String(Date.now()),
      name,
      email,
    };

    users = [...users, newUser];

    // Revalidate the users page to reflect changes
    revalidatePath("/");

    // Return success state
    return { success: true };
  } catch (error) {
    // Return error if something went wrong
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}
