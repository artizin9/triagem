-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ALUNO',
    "city" TEXT,
    "country" TEXT,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "Treino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT,
    "name" TEXT NOT NULL,
    "conclusionTime" TEXT NOT NULL,
    "levelTraining" TEXT NOT NULL,
    "weekDay" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "repetitions" TEXT NOT NULL,
    "executions" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "treinoId" TEXT NOT NULL,
    CONSTRAINT "Exercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserTreino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "treinoId" TEXT NOT NULL,
    CONSTRAINT "UserTreino_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTreino_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTreino_userId_treinoId_key" ON "UserTreino"("userId", "treinoId");
