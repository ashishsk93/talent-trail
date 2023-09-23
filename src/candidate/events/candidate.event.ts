import Container, { Service } from "typedi";
import { CandidateEvents } from "../constants/candidate.constants";

@Service({ global: true })
export class CandidateEventHandler {
  constructor(private eventEmitter: any) {
    this.eventEmitter = Container.get("eventEmitter");

    this.eventEmitter.on(CandidateEvents.ACCEPTED, (data: any) => {
      console.log("Candidate has been accepted");
    });

    this.eventEmitter.on(CandidateEvents.REJECTED, (data: any) => {
      console.log("Candidate has been rejected");
    });
  }
}
