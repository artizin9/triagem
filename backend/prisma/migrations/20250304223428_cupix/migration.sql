-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "tempoConclusao" TEXT NOT NULL,
    "diasDaSemana" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "numExecucoes" INTEGER NOT NULL,
    "numRepeticoes" INTEGER NOT NULL,
    "execucoesRepeticao" INTEGER NOT NULL,
    "intervalo" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotoExercicio" TEXT NOT NULL,
    "treinoId" TEXT NOT NULL,
    CONSTRAINT "Exercise_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Training" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainingLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "dataRealizacao" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "TrainingLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TrainingLog_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserTrainings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserTrainings_A_fkey" FOREIGN KEY ("A") REFERENCES "Training" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserTrainings_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserTrainings_AB_unique" ON "_UserTrainings"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTrainings_B_index" ON "_UserTrainings"("B");
