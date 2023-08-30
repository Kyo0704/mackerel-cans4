'use client';
import { useState, useEffect } from 'react';
import { ProductType } from '../../type';

export default function Product() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/product`);
            const data = await response.json();
            setProducts(data);
        };
        fetchData();
    }, []);

    const displayDetails = (product: ProductType) => {
        setSelectedProduct(product);
    };

    const resetSelectedProduct = () => {
        setSelectedProduct(null);
    };

    const toggleDiscounted = () => {
        setShowOnlyDiscounted(!showOnlyDiscounted);
    };

    const filteredProducts = showOnlyDiscounted
        ? products.filter(product => product.discounts.length > 0)
        : products;

    if (selectedProduct) {
       return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-r from-blue-400 via-teal-500 to-green-400">
            <button
                onClick={resetSelectedProduct}
                className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
                戻る
            </button>
            <h2 className="text-2xl mb-4 text-gray-800">{selectedProduct.pname}</h2>
            <img className="mb-4 w-full object-contain" src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${selectedProduct.image}`} alt={selectedProduct.pname} />
            <p className="mb-2 text-xl font-semibold text-gray-700">￥: {selectedProduct.price}円</p>
            <p className="mb-2 text-lg text-gray-700">産地: {selectedProduct.production_area}</p>
            <p className="mb-2 text-lg text-gray-700">容量: {selectedProduct.volume}</p>
        </div>
      );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-r from-blue-400 via-teal-500 to-green-400">
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleDiscounted}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                    {showOnlyDiscounted ? 'すべての商品を表示' : '値引き商品のみを表示'}
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                    <div key={product.pid} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                        <div className="flex-shrink-0">
                            <img className="h-48 w-full object-cover" src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${product.image}`} alt={product.pname} />
                        </div>
                        <div className="flex-1 p-4">
                            <h3 className="font-semibold text-gray-900 text-lg">{product.pname}</h3>
                            <p className="text-gray-600">￥: {product.price}円</p>
                            <p className="text-gray-500">産地: {product.production_area}</p>
                            <p className="text-gray-400">容量: {product.volume}</p>
                        </div>
                        <div className="p-4 bg-gray-100 border-t border-gray-200">
                            <button onClick={() => displayDetails(product)} className="text-lg font-bold text-purple-600 hover:text-purple-700">
                                詳細を見る
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
