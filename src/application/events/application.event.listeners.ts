import { PrismaClient } from "@prisma/client";
import { ApplicationEvents } from "../constants/application.events";
import { Service } from "typedi";
import { EventStatus } from "../constants/application.constants";
const EventEmitter = require('events');

@Service({ global: true })
export class ApplicationEventListeners {
  private applicationEventEmitter;
  private prisma;

  constructor() {
    this.applicationEventEmitter = new EventEmitter();
    this.prisma = new PrismaClient();

    this.applicationEventEmitter.on(ApplicationEvents.APPLIED, async (data: any) => {
      await this.prisma.applicationTimeline.create({
        data: {
          applicationId: data.id,
          event: ApplicationEvents.APPLIED,
          status: EventStatus.COMPLETED,
          when: new Date()
        }
      })
    });
  }

  raiseEvent(event: string, payload?: any) {
    this.applicationEventEmitter.emit(event, payload);
  }
}