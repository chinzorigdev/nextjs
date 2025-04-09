// app/actions.ts - Server Actions
"use server";

import { revalidatePath } from "next/cache";
import { sleep } from "../uos/utils";
import { z } from "zod";
import { UserSchemaType, userSchema } from "./lib/schemas";
import { State, Errors } from "./types"; // Import State and Errors

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
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const validatedFields = userSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
    });

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      console.log(fieldErrors);
      return {
        ...prevState,
        errors: fieldErrors as Errors, // Use the imported Errors type
        message: "Missing or invalid fields.",
        success: false,
        error: undefined,
      };
    }

    const { name, email } = validatedFields.data;

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
    return {
      ...prevState,
      success: true,
      message: "User added successfully!",
      errors: undefined,
      error: undefined,
    };
  } catch (error: any) {
    console.error("Error adding user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      ...prevState,
      error: errorMessage, // Use the specific error message
      success: false,
      errors: undefined,
      message: "Failed to add user.",
    };
  }
}
