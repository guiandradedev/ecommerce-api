-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'started',
ALTER COLUMN "finished" SET DEFAULT false,
ALTER COLUMN "installments" SET DEFAULT 1;
