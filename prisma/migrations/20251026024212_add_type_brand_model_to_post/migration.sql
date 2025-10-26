/*
  Warnings:

  - Added the required column `brand` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
