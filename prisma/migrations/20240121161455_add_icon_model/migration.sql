-- CreateEnum
CREATE TYPE "IconTypes" AS ENUM ('FINANCIAL', 'LEISURE', 'EDUCATION', 'HEALTH', 'TRANSPORT_AND_TRAVEL', 'PETS_AND_KIDS', 'FOOD', 'DIGITAL', 'HOME', 'BILLS', 'OTHER');

-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" "IconTypes" NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);
