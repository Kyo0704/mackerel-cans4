import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allProducts = await prisma.product.findMany({
        include: {
          discounts: {
            include: {
              state: true,
            }
          },
        },
      });

      // 割引額を計算して、各商品に追加
      const productsWithDiscount = allProducts.map(product => {
        let originalPrice = product.price || 0; // 値引き前の金額
        let discountedPrice = originalPrice;   // 値引き後の金額
        let discountAmount = 0;                // 値引き額

        if (product.discounts && product.discounts.length > 0) {
          discountAmount = product.price - product.discounts[0].dprice;
          discountedPrice = originalPrice - discountAmount;
        }

        return {
          ...product,
          originalPrice,
          discountedPrice,
          discountAmount
        }
      });

      res.status(200).json(productsWithDiscount);  // 割引情報が付加された商品情報を返す
    } catch (error: any) {
      console.error("Database fetch error:", error);  // エラーの詳細を表示
      res.status(500).json({ message: 'An error occurred', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
