import { container } from "tsyringe";
import { JobService } from "../service/job.service";

const jobService = container.resolve(JobService);

const Query = {
    getJobs: () => {
        return jobService.getAllJobs();
    },
    getJob: (parent: unknown, args: { id: number; }) => {
        return jobService.getJobById(args.id);
    }
}

const Mutation = {
    createJob: (parent: unknown, args: { input: CreateJobDto; }) => {
        return jobService.createJob(args.input);
    },
    updateJob: (parent: unknown, args: { id: number; input: UpdateEmployeeDto}) => {
        return jobService.updateJob(args.id, args.input);
    },
    deleteJob: (parent: unknown, args: { id: number; }) => {
        return jobService.deleteJob(args.id);
    }
}

export {
    Query,
    Mutation
}