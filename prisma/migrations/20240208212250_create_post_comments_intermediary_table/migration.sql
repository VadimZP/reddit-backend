-- CreateTable
CREATE TABLE "posts_comments" (
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "posts_comments_pkey" PRIMARY KEY ("post_id","user_id")
);

-- AddForeignKey
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
