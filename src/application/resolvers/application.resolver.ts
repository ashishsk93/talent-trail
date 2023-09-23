import Container from "typedi";
import { ApplicationService } from "../service/application.service";
import { Status } from "../constants/application.constants";
import { TimelineService } from "../service/timeline.service";
import { ApplicationCreateDto, SubmitReviewDto } from "../dto/application.dto";

const applicationService = Container.get(ApplicationService);
const timelineService = Container.get(TimelineService);

const Query = {
  getApplications: async () => {
    const applications = await applicationService.getAllApplications();
    const resp = applications.map((application) => {
      return {
        ...application,
        timeline() {
          return timelineService.getTimelineByApplicationId(application.id);
        },
      };
    });
    return resp;
  },
};

const Mutation = {
  createApplication: async (
    parent: unknown,
    args: { input: ApplicationCreateDto }
  ) => {
    args.input.status = Status.APPLIED;
    const application = await applicationService.createApplication(args.input);
    return {
      ...application,
      timeline() {
        return timelineService.getTimelineByApplicationId(application.id);
      },
    };
  },
  submitReview: async (
    parent: unknown,
    args: { id: number; input: SubmitReviewDto }
  ) => {
    const application = await applicationService.submitReview(
      args.id,
      args.input
    );
    return {
      ...application,
      timeline() {
        return timelineService.getTimelineByApplicationId(application.id);
      },
    };
  },
};

export { Query, Mutation };
