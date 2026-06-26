/*
  Warnings:

  - You are about to drop the column `betterAnswerOutline` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `userAnswerSummary` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `whatInterviewersWouldThink` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `whatWasMissing` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "betterAnswerOutline",
DROP COLUMN "feedback",
DROP COLUMN "userAnswerSummary",
DROP COLUMN "whatInterviewersWouldThink",
DROP COLUMN "whatWasMissing";
