/*
  Warnings:

  - You are about to drop the column `escrowId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `authy_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_verify_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_verify_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_verify_expires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `login_ip` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_expires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_verify_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_verify_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_verify_expires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `platform_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_locked` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_locked_by` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_locked_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_locked_message` on the `User` table. All the data in the column will be lost.
  - Made the column `description` on table `MarketplaceItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email_verified` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_verified` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fraudScoreId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_date` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FraudScore" ALTER COLUMN "result" SET DEFAULT 'NO RECORD';

-- AlterTable
ALTER TABLE "MarketplaceItem" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "address" TEXT,
ADD COLUMN     "authy_id" INTEGER,
ADD COLUMN     "date_of_birth" TEXT,
ADD COLUMN     "email_verified" BOOLEAN NOT NULL,
ADD COLUMN     "email_verify_code" TEXT,
ADD COLUMN     "email_verify_date" TIMESTAMP(3),
ADD COLUMN     "email_verify_expires" TIMESTAMP(3),
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "login_ip" TEXT,
ADD COLUMN     "password_reset" BOOLEAN,
ADD COLUMN     "password_reset_expires" TIMESTAMP(3),
ADD COLUMN     "password_reset_token" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "phone_verified" BOOLEAN NOT NULL,
ADD COLUMN     "phone_verify_code" TEXT,
ADD COLUMN     "phone_verify_date" TIMESTAMP(3),
ADD COLUMN     "phone_verify_expires" TIMESTAMP(3),
ADD COLUMN     "platform_id" TEXT,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "user_locked" BOOLEAN,
ADD COLUMN     "user_locked_by" TEXT,
ADD COLUMN     "user_locked_date" TIMESTAMP(3),
ADD COLUMN     "user_locked_message" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "escrowId",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "fraudScoreId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "authy_id",
DROP COLUMN "date_of_birth",
DROP COLUMN "email_verified",
DROP COLUMN "email_verify_code",
DROP COLUMN "email_verify_date",
DROP COLUMN "email_verify_expires",
DROP COLUMN "last_login",
DROP COLUMN "login_ip",
DROP COLUMN "nickname",
DROP COLUMN "password_reset",
DROP COLUMN "password_reset_expires",
DROP COLUMN "password_reset_token",
DROP COLUMN "payment_method",
DROP COLUMN "phone_number",
DROP COLUMN "phone_verified",
DROP COLUMN "phone_verify_code",
DROP COLUMN "phone_verify_date",
DROP COLUMN "phone_verify_expires",
DROP COLUMN "platform_id",
DROP COLUMN "role",
DROP COLUMN "user_locked",
DROP COLUMN "user_locked_by",
DROP COLUMN "user_locked_date",
DROP COLUMN "user_locked_message",
ALTER COLUMN "created_date" SET NOT NULL;

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_userId_key" ON "PaymentMethod"("userId");

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
