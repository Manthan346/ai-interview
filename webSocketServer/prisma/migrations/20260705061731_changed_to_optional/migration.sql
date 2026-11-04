-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_numberOfQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_roleId_fkey";

-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "experienceId" DROP NOT NULL,
ALTER COLUMN "numberOfQuestionId" DROP NOT NULL,
ALTER COLUMN "roleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "YearOfExperience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_numberOfQuestionId_fkey" FOREIGN KEY ("numberOfQuestionId") REFERENCES "NumberOfQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
