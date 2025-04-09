// app/components/UserForm.tsx
"use client";

import { useRef, useTransition, Suspense } from "react";
import { addUser } from "../actions"; // Import State from actions
import { useActionState } from "react";

import { State } from "../types";

import { useOptimistic } from "react";
import type { User } from "../actions";
import { z } from "zod";
import { userSchema } from "../lib/schemas";

export function UserForm({ users }: { users: User[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  // useActionState to handle form submission state
  const [state, formAction] = useActionState<State, FormData>(addUser, {
    error: undefined,
    success: false,
    errors: { name: undefined, email: undefined },
    message: undefined,
  });

  // To track pending state separately
  const [isPending, startTransition] = useTransition();

  // Optimistic update logic
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state, newUser: User) => [...state, newUser]
  );

  // Handle form submission with optimistic update
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);

    // Create optimistic user entry
    const optimisticUser = {
      id: String(Date.now()),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };

    // Use startTransition to handle pending state and optimistic update
    startTransition(() => {
      // Add optimistic update
      addOptimisticUser(optimisticUser);
      formAction(formData);
      formRef.current?.reset();
    });
  };

  // Helper to handle different error formats
  const renderErrors = (errors: string[] | undefined) => {
    if (!errors) return null;

    return errors.map((error, index) => (
      <p key={index} className="text-red-500 text-sm mt-1">
        {error}
      </p>
    ));
  };

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Шинэ хэрэглэгч нэмэх</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Нэр
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
          {state?.errors?.name && renderErrors(state.errors.name)}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            И-мэйл
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
          {state?.errors?.email && renderErrors(state.errors.email)}
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add User"}
        </button>

        {state.error && (
          <p className="text-red-500 text-sm mt-2">{state.error}</p>
        )}

        {state.message && !state.error && (
          <p className="text-green-500 text-sm mt-2">{state.message}</p>
        )}
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Хэрэглэгчийн жагсаалт</h2>

      <Suspense fallback={<p>Loading users...</p>}>
        <div className="space-y-4">
          {optimisticUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 border rounded-md ${
                !users.some((u) => u.id === user.id)
                  ? "opacity-50 bg-gray-50"
                  : ""
              }`}
            >
              <p className="font-bold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
