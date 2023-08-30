
import Product from './Product.client';

export default function ProductPage() {

  return (
    <main className="bg-white px-4 py-16">
      <h1 className="text-3xl bg-lime-500 font-bold text-center mb-8">商品情報一覧</h1>
      <Product/>
      {/* 他のコード */}
    </main>
  );
}
