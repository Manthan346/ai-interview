/*
  Warnings:

  - Added the required column `userOtp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otpExpires" TIMESTAMP(3),
ADD COLUMN     "userOtp" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
