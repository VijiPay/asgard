/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "isAdmin",
DROP COLUMN "name",
DROP COLUMN "preferences",
DROP COLUMN "updatedAt",
ADD COLUMN     "address" JSONB,
ADD COLUMN     "api_key" TEXT,
ADD COLUMN     "authy_id" INTEGER,
ADD COLUMN     "broker" JSONB,
ADD COLUMN     "business" JSONB,
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "date_of_birth" TEXT,
ADD COLUMN     "email_verified" BOOLEAN,
ADD COLUMN     "email_verify_code" TEXT,
ADD COLUMN     "email_verify_date" TIMESTAMP(3),
ADD COLUMN     "email_verify_expires" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "fraud_score" INTEGER,
ADD COLUMN     "individual" JSONB,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "login_ip" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "organization" JSONB,
ADD COLUMN     "password_reset" BOOLEAN,
ADD COLUMN     "password_reset_expires" TIMESTAMP(3),
ADD COLUMN     "password_reset_token" TEXT,
ADD COLUMN     "payment_method" JSONB,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "phone_verified" BOOLEAN,
ADD COLUMN     "phone_verify_code" TEXT,
ADD COLUMN     "phone_verify_date" TIMESTAMP(3),
ADD COLUMN     "phone_verify_expires" TIMESTAMP(3),
ADD COLUMN     "platform_id" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "tos_acceptance" JSONB,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "user_locked" BOOLEAN,
ADD COLUMN     "user_locked_by" TEXT,
ADD COLUMN     "user_locked_date" TIMESTAMP(3),
ADD COLUMN     "user_locked_message" TEXT,
ADD COLUMN     "webhooks" JSONB;

-- CreateTable
CREATE TABLE "businesses" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "cac_number" TEXT,
    "registered_address" TEXT,
    "business_name" TEXT,
    "business_email" TEXT,
    "business_phone" TEXT,
    "business_website" TEXT,
    "social_media" JSONB,
    "isverified" BOOLEAN,
    "isFraud" BOOLEAN,
    "status" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
