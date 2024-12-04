import { PrismaClient } from "@prisma/client";

// `globalThis`に型を追加
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Prismaクライアントのインスタンスを作成
const prisma = global.prisma || new PrismaClient();

// 開発環境では、グローバルに保持して再生成を防ぐ
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma };
