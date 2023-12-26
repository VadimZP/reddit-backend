/*
  Warnings:

  - You are about to drop the `UsersOnCommunities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnCommunities" DROP CONSTRAINT "UsersOnCommunities_community_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnCommunities" DROP CONSTRAINT "UsersOnCommunities_user_id_fkey";

-- DropTable
DROP TABLE "UsersOnCommunities";

-- CreateTable
CREATE TABLE "communities_members" (
    "member_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL,

    CONSTRAINT "communities_members_pkey" PRIMARY KEY ("member_id","community_id")
);

-- AddForeignKey
ALTER TABLE "communities_members" ADD CONSTRAINT "communities_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities_members" ADD CONSTRAINT "communities_members_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
