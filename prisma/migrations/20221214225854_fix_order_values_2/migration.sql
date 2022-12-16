-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_payment_type_id_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "payment_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "payment_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
