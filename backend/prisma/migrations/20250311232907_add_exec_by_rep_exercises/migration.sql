/*
  Warnings:

  - Added the required column `execByRep` to the `Exercicio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "repetitions" TEXT NOT NULL,
    "executions" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "execByRep" TEXT NOT NULL,
    "treinoId" TEXT NOT NULL,
    CONSTRAINT "Exercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exercicio" ("description", "executions", "id", "imageUrl", "interval", "name", "repetitions", "treinoId") SELECT "description", "executions", "id", "imageUrl", "interval", "name", "repetitions", "treinoId" FROM "Exercicio";
DROP TABLE "Exercicio";
ALTER TABLE "new_Exercicio" RENAME TO "Exercicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
