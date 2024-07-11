/*
  Warnings:

  - Made the column `type` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country_code` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "country_code" SET NOT NULL;
