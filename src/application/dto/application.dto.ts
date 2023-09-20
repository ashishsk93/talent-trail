interface ApplicationCreateDto {
    candidateId: number;
    jobId: number;
    referredById?: number;
    status: string;
    appliedDate?: Date;
    score?: number;
}

interface ApplicationUpdateDto {
    status?: string;
    score?: number;
}

interface ApplicationTimelineCreateDto {
    applicationId: number;
    event: string;
    status: string;
    when: Date;
}