import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ProductType } from '../../type';

export default function ProductList() {
  const router = useRouter();
  const { sid } = router.query;

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (!sid) return;

    const fetchData = async () => {
      const response = await fetch(`/api/product/${sid}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, [sid]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.pid} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${product.image}`}
                alt={product.pname}
              />
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-semibold text-gray-900 text-lg">{product.pname}</h3>
              <p className="text-gray-600">￥:{product.price}円</p>
              <p className="text-gray-500">産地:{product.production_area}</p>
              <p className="text-gray-400">容量:{product.volume}</p>
            </div>
            <div className="p-4">
              <Link href={`/product/${sid}/${product.pid}`} className="text-base font-semibold text-lime-600 hover:text-lime-500">
                  詳細を見る
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
