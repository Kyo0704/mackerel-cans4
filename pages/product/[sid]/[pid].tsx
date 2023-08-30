import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ProductType } from '../../../type';

export default function ProductDetail() {
  const router = useRouter();
  const { sid, pid } = router.query;

  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (!sid || !pid) return;

    const fetchData = async () => {
      const response = await fetch(`/api/product/${sid}/${pid}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchData();
  }, [sid, pid]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl bg-lime-500 font-bold text-center mb-8">{product.pname}</h1>
      <img
        className="h-48 w-full object-cover"
        src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${product.image}`}
        alt={product.pname}
      />
      <p className="text-gray-600">￥:{product.price}円</p>
      <p className="text-gray-500">産地:{product.production_area}</p>
      <p className="text-gray-400">容量:{product.volume}</p>
    </div>
  );
};
