import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class CandidateService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllCandidates() {
        return this.prisma.candidate.findMany();
    }
} 