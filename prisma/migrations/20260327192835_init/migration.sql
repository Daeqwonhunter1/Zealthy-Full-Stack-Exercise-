-- CreateTable
CREATE TABLE "Medication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dosage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Medication_name_key" ON "Medication"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dosage_value_key" ON "Dosage"("value");
