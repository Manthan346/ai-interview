/*
  Warnings:

  - Added the required column `experienceValue` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfQuestionValue` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleValue` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "experienceValue" TEXT NOT NULL,
ADD COLUMN     "numberOfQuestionValue" TEXT NOT NULL,
ADD COLUMN     "roleValue" TEXT NOT NULL;
