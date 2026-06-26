/*
  Warnings:

  - You are about to drop the column `questions` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questions",
ADD COLUMN     "question" TEXT;
