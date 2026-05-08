-- CreateTable
CREATE TABLE "Policy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "pastIssues" TEXT NOT NULL,
    "systemDescription" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "estimatedDuration" TEXT NOT NULL,
    "actualDuration" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
