/*
  Warnings:

  - Added the required column `gender` to the `Name` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meaning` to the `Name` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNISEX');

-- AlterTable
ALTER TABLE "Name" ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "meaning" TEXT NOT NULL;
