/*
  Warnings:

  - The primary key for the `UsersOnCommunities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `communityId` on the `UsersOnCommunities` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UsersOnCommunities` table. All the data in the column will be lost.
  - You are about to drop the `Community` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VotesOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `community_id` to the `UsersOnCommunities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UsersOnCommunities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_communityId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnCommunities" DROP CONSTRAINT "UsersOnCommunities_communityId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnCommunities" DROP CONSTRAINT "UsersOnCommunities_userId_fkey";

-- DropForeignKey
ALTER TABLE "VotesOnPosts" DROP CONSTRAINT "VotesOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "VotesOnPosts" DROP CONSTRAINT "VotesOnPosts_userId_fkey";

-- AlterTable
ALTER TABLE "UsersOnCommunities" DROP CONSTRAINT "UsersOnCommunities_pkey",
DROP COLUMN "communityId",
DROP COLUMN "userId",
ADD COLUMN     "community_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "UsersOnCommunities_pkey" PRIMARY KEY ("user_id", "community_id");

-- DropTable
DROP TABLE "Community";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VotesOnPosts";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" VARCHAR(16) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communities" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "text" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_votes" (
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vote" SMALLINT NOT NULL,

    CONSTRAINT "posts_votes_pkey" PRIMARY KEY ("post_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "communities_title_key" ON "communities"("title");

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCommunities" ADD CONSTRAINT "UsersOnCommunities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCommunities" ADD CONSTRAINT "UsersOnCommunities_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_votes" ADD CONSTRAINT "posts_votes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_votes" ADD CONSTRAINT "posts_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
