/*
  Warnings:

  - You are about to drop the column `isStudent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isTeacher` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isStudent",
DROP COLUMN "isTeacher";
