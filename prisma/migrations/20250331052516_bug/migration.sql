/*
  Warnings:

  - You are about to drop the column `orderReadAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderReadAt",
ADD COLUMN     "orderReadyAt" TIMESTAMP(3);
