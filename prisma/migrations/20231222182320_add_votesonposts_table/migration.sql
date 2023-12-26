-- CreateTable
CREATE TABLE "VotesOnPosts" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "vote" INTEGER NOT NULL,

    CONSTRAINT "VotesOnPosts_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "VotesOnPosts" ADD CONSTRAINT "VotesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VotesOnPosts" ADD CONSTRAINT "VotesOnPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
