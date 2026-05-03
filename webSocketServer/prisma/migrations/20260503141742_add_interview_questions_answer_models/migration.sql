/*
  Warnings:

  - You are about to drop the column `interviewType` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `candidateName` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectionChances` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "selectionChances" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_interviewId_fkey";

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "interviewType",
ADD COLUMN     "candidateName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "improvements" TEXT[],
ADD COLUMN     "overallScore" INTEGER,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "selectionChances" "selectionChances" NOT NULL,
ADD COLUMN     "strengths" TEXT[],
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "weaknesses" TEXT[];

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "questions" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "answerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "userAnswerSummary" TEXT,
    "expectedAnswer" TEXT,
    "score" INTEGER NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_id_key" ON "Question"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Question_answerId_key" ON "Question"("answerId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_id_key" ON "Answer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_questionId_key" ON "Answer"("questionId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
