/*
  Warnings:

  - You are about to drop the column `experience` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfQuestions` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Interview` table. All the data in the column will be lost.
  - Added the required column `experienceId` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfQuestionId` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "experience",
DROP COLUMN "numberOfQuestions",
DROP COLUMN "role",
ADD COLUMN     "experienceId" TEXT NOT NULL,
ADD COLUMN     "numberOfQuestionId" TEXT NOT NULL,
ADD COLUMN     "roleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "YearOfExperience" (
    "id" TEXT NOT NULL,
    "experience" TEXT NOT NULL,

    CONSTRAINT "YearOfExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NumberOfQuestion" (
    "id" TEXT NOT NULL,
    "NumberOfQuestion" TEXT NOT NULL,

    CONSTRAINT "NumberOfQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "YearOfExperience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_numberOfQuestionId_fkey" FOREIGN KEY ("numberOfQuestionId") REFERENCES "NumberOfQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
