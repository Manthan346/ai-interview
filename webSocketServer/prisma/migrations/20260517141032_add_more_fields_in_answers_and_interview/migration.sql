/*
  Warnings:

  - Added the required column `betterAnswerOutline` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedback` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalQuestion` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatInterviewersWouldThink` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatWasMissing` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "betterAnswerOutline" TEXT NOT NULL,
ADD COLUMN     "feedback" TEXT NOT NULL,
ADD COLUMN     "originalQuestion" TEXT NOT NULL,
ADD COLUMN     "whatInterviewersWouldThink" TEXT NOT NULL,
ADD COLUMN     "whatWasMissing" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "candidatePerspective" TEXT[],
ADD COLUMN     "finalInterviewVerdict" TEXT[];
