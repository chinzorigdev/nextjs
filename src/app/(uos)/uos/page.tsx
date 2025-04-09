// app/page.tsx
import { Suspense } from "react";
import { getUsers } from "./actions";
import { UserForm } from "./components/UserForm";

// Loading component that shows while users are being fetched
function UsersLoading() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">
        Хэрэглэгчийн жагсаалт ачаалж байна...
      </h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border rounded-md animate-pulse bg-gray-100"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Users component that fetches and displays users
async function Users() {
  const users = await getUsers();

  return <UserForm users={users} />;
}

// Main page component with Suspense for loading state
export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">
        Next.js 15 - Server Actions, Suspense, Optimistic UI
      </h1>

      <Suspense fallback={<UsersLoading />}>
        <Users />
      </Suspense>
    </main>
  );
}
