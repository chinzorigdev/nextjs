// app/page.tsx
import { Suspense } from "react";
import { getItems } from "../blog/lib/data";
import ItemList from "./item-list";
import LoadingFallback from "../blog/loading"; // loading.tsx-г импортлох
import { type Item } from "../blog/lib/data";

export default async function HomePage() {
  // Сервер компонент дотор асинхрон функц дуудаж болно
  // Энэ хэсэг Suspense-ийн дотор ажиллана
  const initialItemsPromise = getItems();

  return (
    <div>
      {/* Suspense: initialItemsPromise дуусаагүй үед fallback-г харуулна */}
      <Suspense fallback={<LoadingFallback />}>
        {/* Promise дууссаны дараа ItemList-г рендерлэнэ */}
        {/* await ашиглан Promise-ийн үр дүнг дамжуулна */}
        <ResolvedItemList promise={initialItemsPromise} />
      </Suspense>
    </div>
  );
}

// Suspense нь promise-г шууд prop-оор хүлээж авдаггүй тул
// тусад нь компонент болгож шийдвэрлэнэ.
async function ResolvedItemList({ promise }: { promise: Promise<Item[]> }) {
  const initialItems = await promise;
  return <ItemList initialItems={initialItems} />;
}
