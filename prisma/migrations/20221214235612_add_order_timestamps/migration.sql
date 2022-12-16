/*
  Warnings:

  - Added the required column `updatedAt` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "StatusEnum" ADD VALUE 'canceled';

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
