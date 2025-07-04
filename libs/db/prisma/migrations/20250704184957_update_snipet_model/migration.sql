-- CreateEnum
CREATE TYPE "SnippetVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visibility" "SnippetVisibility";

-- CreateIndex
CREATE INDEX "Snippet_organizationId_idx" ON "Snippet"("organizationId");

-- CreateIndex
CREATE INDEX "Snippet_parentId_idx" ON "Snippet"("parentId");
