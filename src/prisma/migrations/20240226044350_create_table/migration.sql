/*
  Warnings:

  - You are about to drop the column `twittId` on the `BookMarkPost` table. All the data in the column will be lost.
  - You are about to drop the column `twiitId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Twitt` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `BookMarkPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tweetId` to the `BookMarkPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweetId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `nickname` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookMarkPost" DROP CONSTRAINT "BookMarkPost_twittId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_twiitId_fkey";

-- DropForeignKey
ALTER TABLE "Twitt" DROP CONSTRAINT "Twitt_authorId_fkey";

-- DropIndex
DROP INDEX "BookMarkPost_userId_twittId_key";

-- AlterTable
ALTER TABLE "BookMarkPost" DROP COLUMN "twittId",
ADD COLUMN     "tweetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "twiitId",
ADD COLUMN     "tweetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "nickname" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "Twitt";

-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookMarkPost_userId_tweetId_key" ON "BookMarkPost"("userId", "tweetId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMarkPost" ADD CONSTRAINT "BookMarkPost_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
