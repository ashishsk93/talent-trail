import { PrismaClient } from "@prisma/client";
import Container, { Service } from "typedi";

@Service({ global: true })
export class JobService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = Container.get('prisma');
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