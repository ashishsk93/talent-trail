import { ApplicationTimeline, PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service({ global: true })
export class TimelineService {
    private prisma;

    constructor(){
        this.prisma = new PrismaClient();
    }

    getTimelineByApplicationId(applicationId: number): Promise<ApplicationTimeline[]> {
        return this.prisma.applicationTimeline.findMany({
            where: {
                applicationId
            }
        });
    }
}