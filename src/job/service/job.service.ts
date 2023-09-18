import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class JobService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getAllJobs () {
        return this.prisma.job.findMany();
    }

    getJobById (id: number) {
        return this.prisma.job.findUnique({
            where: {
                id
            }
        });
    }

    createJob (input: CreateJobDto) {
        return this.prisma.job.create({
            data: input
        });
    }

    updateJob (id: number, input: UpdateJobDto) {
        return this.prisma.job.update({
            where: {
                id
            },
            data: input
        })
    }

    deleteJob (id: number) {
        return this.prisma.job.delete({
            where: {
                id
            }
        });
    }
}