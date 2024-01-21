-- CreateTable
CREATE TABLE "Currency" (
    "num" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_num_key" ON "Currency"("num");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");
