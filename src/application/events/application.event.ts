import Container, { Service } from "typedi";
import {
  ApplicationEvents,
  EventStatus,
  Status,
} from "../constants/application.constants";
import { TimelineService } from "../service/timeline.service";
import { CandidateEvents } from "../../candidate/constants/candidate.constants";

@Service({ global: true })
export class ApplicationEventHandler {
  constructor(
    private timelineService: TimelineService,
    private eventEmitter: any
  ) {
    const applicationEventEmitter = Container.get("eventEmitter") as any;
    this.timelineService = Container.get(TimelineService);
    this.eventEmitter = Container.get("eventEmitter");

    applicationEventEmitter.on(ApplicationEvents.APPLIED, async (data: any) => {
      await this.timelineService.createTimeline({
        applicationId: data.id,
        event: ApplicationEvents.APPLIED,
        status: EventStatus.COMPLETED,
        when: new Date(),
      });
      await this.timelineService.createTimeline({
        applicationId: data.id,
        event: ApplicationEvents.HR_REVIEW,
        status: EventStatus.PENDING,
        when: new Date(),
      });
    });

    applicationEventEmitter.on(
      ApplicationEvents.HR_REVIEW,
      async (data: any) => {
        if (data.status === Status.HR_ACCEPTED) {
          await this.timelineService.updateTimeline(
            data.id,
            ApplicationEvents.HR_REVIEW,
            {
              status: EventStatus.ACCEPTED,
              when: new Date(),
            }
          );
          await this.timelineService.createTimeline({
            applicationId: data.id,
            event: ApplicationEvents.TIMESLOT_SUBMISSION,
            status: EventStatus.PENDING,
            when: new Date(),
          });
        } else if (data.status === Status.HR_REJECTED) {
          await this.timelineService.updateTimeline(
            data.id,
            ApplicationEvents.HR_REVIEW,
            {
              status: EventStatus.REJECTED,
              when: new Date(),
            }
          );
          this.eventEmitter.emit(CandidateEvents.REJECTED);
        }
      }
    );
  }
}
