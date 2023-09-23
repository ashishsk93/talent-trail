import { PrismaClient } from "@prisma/client";
import { ApplicationEvents } from "../constants/application.events";
import { Service } from "typedi";
import { EventStatus, Status } from "../constants/application.constants";
const EventEmitter = require("events");

@Service({ global: true })
export class ApplicationEventHandler {
  private applicationEventEmitter;
  private prisma;

  constructor() {
    this.applicationEventEmitter = new EventEmitter();
    this.prisma = new PrismaClient();

    this.applicationEventEmitter.on(
      ApplicationEvents.APPLIED,
      async (data: any) => {
        await this.prisma.applicationTimeline.create({
          data: {
            applicationId: data.id,
            event: ApplicationEvents.APPLIED,
            status: EventStatus.COMPLETED,
            when: new Date(),
          },
        });
        await this.prisma.applicationTimeline.create({
          data: {
            applicationId: data.id,
            event: ApplicationEvents.HR_REVIEW,
            status: EventStatus.PENDING,
            when: new Date(),
          },
        });
      }
    );

    this.applicationEventEmitter.on(
      ApplicationEvents.HR_REVIEW,
      async (data: any) => {
        if (data.status === Status.HR_ACCEPTED) {
          await this.prisma.applicationTimeline.update({
            where: {
              applicationId_event: {
                applicationId: data.id,
                event: ApplicationEvents.HR_REVIEW,
              },
            },
            data: {
              status: EventStatus.ACCEPETED,
              when: new Date(),
            },
          });
        } else if (data.status === Status.HR_REJECTED) {
          await this.prisma.applicationTimeline.update({
            where: {
              applicationId_event: {
                applicationId: data.id,
                event: ApplicationEvents.HR_REVIEW,
              },
            },
            data: {
              status: EventStatus.REJECTED,
              when: new Date(),
            },
          });
        }
        await this.prisma.applicationTimeline.create({
          data: {
            applicationId: data.id,
            event: ApplicationEvents.TIMESLOT_SUBMISSION,
            status: EventStatus.PENDING,
            when: new Date(),
          },
        });
      }
    );
  }

  raiseEvent(event: string, payload?: any) {
    this.applicationEventEmitter.emit(event, payload);
  }
}
