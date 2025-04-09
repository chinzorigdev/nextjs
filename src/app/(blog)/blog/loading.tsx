// app/loading.tsx
export default function LoadingFallback() {
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <p className="text-lg font-semibold">Жагсаалтыг ачааллаж байна...</p>
      {/* Энд илүү гоё spinner эсвэл skeleton UI хийж болно */}
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mt-4"></div>
    </div>
  );
}
