/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Name` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Name` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Nickname` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `Nickname` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Nickname` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Name` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickname]` on the table `Nickname` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('INCORRECT', 'OFFENSIVE', 'DUPLICATE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Name" DROP CONSTRAINT "Name_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Nickname" DROP CONSTRAINT "Nickname_nameId_fkey";

-- DropIndex
DROP INDEX "Nickname_nickname_nameId_key";

-- AlterTable
ALTER TABLE "Name" DROP COLUMN "categoryId",
DROP COLUMN "gender",
ADD COLUMN     "addedById" TEXT;

-- AlterTable
ALTER TABLE "Nickname" DROP COLUMN "createdAt",
DROP COLUMN "nameId",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Category";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameNickname" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "nicknameId" TEXT NOT NULL,

    CONSTRAINT "NameNickname_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NameLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "reason" "ReportReason" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NameReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "NameNickname_nameId_nicknameId_key" ON "NameNickname"("nameId", "nicknameId");

-- CreateIndex
CREATE UNIQUE INDEX "NameLike_userId_nameId_key" ON "NameLike"("userId", "nameId");

-- CreateIndex
CREATE UNIQUE INDEX "Name_name_key" ON "Name"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Nickname_nickname_key" ON "Nickname"("nickname");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Name" ADD CONSTRAINT "Name_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameNickname" ADD CONSTRAINT "NameNickname_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "Name"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameNickname" ADD CONSTRAINT "NameNickname_nicknameId_fkey" FOREIGN KEY ("nicknameId") REFERENCES "Nickname"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameLike" ADD CONSTRAINT "NameLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameLike" ADD CONSTRAINT "NameLike_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "Name"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameReport" ADD CONSTRAINT "NameReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameReport" ADD CONSTRAINT "NameReport_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "Name"("id") ON DELETE CASCADE ON UPDATE CASCADE;
