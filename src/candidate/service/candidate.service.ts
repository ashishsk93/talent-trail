import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service({ global: true })
export class CandidateService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getAllCandidates() {
        return this.prisma.candidate.findMany();
    }

    createCandidate(input: CandidateCreateDto) {
        return this.prisma.candidate.create({
            data: input,
        });
    }

    updateCandidate(id: number, input: CandidateUpdateDto) {
        return this.prisma.candidate.update({
            where: {
                id,
            },
            data: input
        });
    }

    deleteCandidate(id: number) {
        return this.prisma.candidate.delete({
            where: {
                id
            }
        });
    }
} 