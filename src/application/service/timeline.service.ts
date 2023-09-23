import { ApplicationTimeline, PrismaClient } from "@prisma/client";
import Container, { Service } from "typedi";
import { TimelineCreateDto, TimelineUpdateDto } from "../dto/timeline.dto";

@Service({ global: true })
export class TimelineService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Container.get("prismaClient");
  }

  getTimelineByApplicationId(
    applicationId: number
  ): Promise<ApplicationTimeline[]> {
    return this.prisma.applicationTimeline.findMany({
      where: {
        applicationId,
      },
    });
  }

  createTimeline(data: TimelineCreateDto) {
    return this.prisma.applicationTimeline.create({ data });
  }

  updateTimeline(
    applicationId: number,
    event: string,
    data: TimelineUpdateDto
  ) {
    return this.prisma.applicationTimeline.update({
      where: {
        applicationId_event: {
          applicationId,
          event,
        },
      },
      data,
    });
  }
}
