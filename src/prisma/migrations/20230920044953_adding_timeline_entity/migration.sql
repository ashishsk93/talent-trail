-- CreateTable
CREATE TABLE "ApplicationTimeline" (
    "applicationId" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "when" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationTimeline_pkey" PRIMARY KEY ("applicationId","event")
);

-- CreateIndex
CREATE INDEX "ApplicationTimeline_applicationId_idx" ON "ApplicationTimeline"("applicationId");
