import { PrismaClient } from "@prisma/client";

export class CandidateService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllCandidates() {
        return this.prisma.candidate.findMany();
    }
} 