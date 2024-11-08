/*
  Warnings:

  - You are about to drop the column `image` on the `Fungus` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fungus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Fungus" ("description", "id", "name") SELECT "description", "id", "name" FROM "Fungus";
DROP TABLE "Fungus";
ALTER TABLE "new_Fungus" RENAME TO "Fungus";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
