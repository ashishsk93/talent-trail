import { Application, Prisma, PrismaClient } from "@prisma/client";
import { ApplicationEventHandler } from "../events/application.event";
import Container, { Service } from "typedi";
import { ApplicationEvents } from "../constants/application.events";

@Service({ global: true })
export class ApplicationService {
    private prisma: PrismaClient;
    private eventEmitter: ApplicationEventHandler;
    constructor(){
        this.prisma = Container.get('prisma');
        this.eventEmitter = Container.get(ApplicationEventHandler);
    }

    getAllApplications(): Promise<Application[]> {
        return this.prisma.application.findMany();
    }

    async createApplication(input: ApplicationCreateDto) {
        input.appliedDate = new Date();
        const application = await this.prisma.application.create({
            data: input,
        });
        this.eventEmitter.raiseEvent(ApplicationEvents.APPLIED, application);
        return application;
    }
}