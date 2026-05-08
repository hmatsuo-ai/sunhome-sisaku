-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "status" "PolicyStatus" NOT NULL,
    "pastIssues" TEXT NOT NULL,
    "systemDescription" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "estimatedDuration" TEXT NOT NULL,
    "actualDuration" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);
