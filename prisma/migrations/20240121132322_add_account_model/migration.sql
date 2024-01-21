/*
  Warnings:

  - Changed the type of `type` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WorkspaceRoles" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "AccountTypes" AS ENUM ('CASH', 'CARD', 'OTHER');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "type",
ADD COLUMN     "type" "WorkspaceRoles" NOT NULL;

-- DropEnum
DROP TYPE "Roles";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL,
    "currencyCode" INTEGER NOT NULL,
    "type" "AccountTypes" NOT NULL,
    "workspaceId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
