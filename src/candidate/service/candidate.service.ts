import { PrismaClient } from "@prisma/client";
import Container, { Service } from "typedi";
import { CandidateEventHandler } from "../events/candidate.event";

@Service({ global: true })
export class CandidateService {
  private prisma: PrismaClient;

  constructor(private eventHandler: CandidateEventHandler) {
    this.prisma = Container.get("prismaClient");
    this.eventHandler = Container.get(CandidateEventHandler);
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
      data: input,
    });
  }

  deleteCandidate(id: number) {
    return this.prisma.candidate.delete({
      where: {
        id,
      },
    });
  }
}
