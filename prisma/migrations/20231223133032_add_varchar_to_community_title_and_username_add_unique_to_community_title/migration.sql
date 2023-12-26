/*
  Warnings:

  - You are about to alter the column `title` on the `Community` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.
  - You are about to alter the column `vote` on the `VotesOnPosts` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - A unique constraint covering the columns `[title]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(16);

-- AlterTable
ALTER TABLE "VotesOnPosts" ALTER COLUMN "vote" SET DATA TYPE SMALLINT;

-- CreateIndex
CREATE UNIQUE INDEX "Community_title_key" ON "Community"("title");
