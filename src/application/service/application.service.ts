import { Application, PrismaClient } from "@prisma/client";
import { ApplicationEventListeners } from "../events/application.event.listeners";
import Container, { Service } from "typedi";
import { ApplicationEvents } from "../constants/application.events";

@Service({ global: true })
export class ApplicationService {
    private prisma;
    private eventEmitter: ApplicationEventListeners;
    constructor(){
        this.prisma = new PrismaClient();
        this.eventEmitter = Container.get(ApplicationEventListeners);
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