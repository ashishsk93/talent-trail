import { Application, PrismaClient } from "@prisma/client";
import Container, { Service } from "typedi";
import {
  ApplicationCreateDto,
  ApplicationUpdateDto,
  SubmitReviewDto,
} from "../dto/application.dto";
import { ApplicationEventHandler } from "../events/application.event";
import {
  ApplicationEvents,
  Status,
  Verdict,
} from "../constants/application.constants";

@Service({ global: true })
export class ApplicationService {
  constructor(
    private prisma: PrismaClient,
    private eventEmitter: any,
    private applicationEventHandler: ApplicationEventHandler
  ) {
    this.prisma = Container.get("prismaClient");
    this.eventEmitter = Container.get("eventEmitter");
    this.applicationEventHandler = Container.get(ApplicationEventHandler);
  }

  getApplicationById(id: number): Promise<Application> {
    return this.prisma.application.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  getAllApplications(): Promise<Application[]> {
    return this.prisma.application.findMany();
  }

  async updateApplication(
    application: Application,
    input: ApplicationUpdateDto
  ) {
    return this.prisma.application.update({
      where: {
        id: application.id,
      },
      data: {
        ...application,
        ...input,
      },
    });
  }

  async createApplication(input: ApplicationCreateDto) {
    input.appliedDate = new Date();
    const application = await this.prisma.application.create({
      data: input,
    });
    this.eventEmitter.emit(ApplicationEvents.APPLIED, application);
    return application;
  }

  async submitReview(id: number, input: SubmitReviewDto) {
    const existingApplication = await this.getApplicationById(id);
    let status = Status.HR_ACCEPTED;
    if (input.verdict === Verdict.REJECTED) {
      status = Status.HR_REJECTED;
    }
    const updatedApplication = await this.updateApplication(
      existingApplication,
      {
        status,
      }
    );
    this.eventEmitter.emit(ApplicationEvents.HR_REVIEW, updatedApplication);
    return updatedApplication;
  }
}
