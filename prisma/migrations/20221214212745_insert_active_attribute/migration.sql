-- AlterTable
ALTER TABLE "product" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "provider" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
