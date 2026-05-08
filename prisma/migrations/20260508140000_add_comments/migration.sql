-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "policyId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "authorName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_policyId_idx" ON "Comment"("policyId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
