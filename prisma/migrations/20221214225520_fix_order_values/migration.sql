-- AlterTable
ALTER TABLE "order" ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "installments" DROP NOT NULL,
ALTER COLUMN "installments" DROP DEFAULT;
