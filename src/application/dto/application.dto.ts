import { Verdict } from "../constants/application.constants";

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

interface SubmitReviewDto {
  verdict: Verdict;
}

interface ApplicationTimelineCreateDto {
  applicationId: number;
  event: string;
  status: string;
  when: Date;
}

export {
  ApplicationCreateDto,
  ApplicationTimelineCreateDto,
  ApplicationUpdateDto,
  SubmitReviewDto,
};
