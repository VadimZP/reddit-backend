/*
  Warnings:

  - You are about to drop the column `createdAt` on the `communities` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `communities` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `communities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_creatorId_fkey";

-- AlterTable
ALTER TABLE "communities" DROP COLUMN "createdAt",
DROP COLUMN "creatorId",
ADD COLUMN     "creator_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
