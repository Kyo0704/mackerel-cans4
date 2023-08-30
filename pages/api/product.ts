import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allProducts = await prisma.product.findMany({
        include: {
          discounts: true,
        },
      });
      res.status(200).json(allProducts);
    } catch (error: any) {
      console.error("Database fetch error:", error);  // エラーの詳細を表示
      res.status(500).json({ message: 'An error occurred', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
