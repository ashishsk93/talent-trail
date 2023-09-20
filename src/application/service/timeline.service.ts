import { ApplicationTimeline, PrismaClient } from "@prisma/client";
import Container, { Service } from "typedi";

@Service({ global: true })
export class TimelineService {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = Container.get('prisma');
    }

    getTimelineByApplicationId(applicationId: number): Promise<ApplicationTimeline[]> {
        return this.prisma.applicationTimeline.findMany({
            where: {
                applicationId
            }
        });
    }
}