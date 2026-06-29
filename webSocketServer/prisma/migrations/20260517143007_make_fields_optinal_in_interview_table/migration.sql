-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "candidatePerspective" DROP NOT NULL,
ALTER COLUMN "candidatePerspective" SET DATA TYPE TEXT,
ALTER COLUMN "finalInterviewVerdict" DROP NOT NULL,
ALTER COLUMN "finalInterviewVerdict" SET DATA TYPE TEXT;
