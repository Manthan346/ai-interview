/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `numberOfQuestions` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "numberOfQuestions" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "betterAnswerOutline" TEXT,
ADD COLUMN     "expectedAnswer" TEXT,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "userAnswerSummary" TEXT,
ADD COLUMN     "whatInterviewersWouldThink" TEXT,
ADD COLUMN     "whatWasMissing" TEXT;

-- DropTable
DROP TABLE "Answer";

-- DropEnum
DROP TYPE "assignedRole";
