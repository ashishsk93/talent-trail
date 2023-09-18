import { container } from "tsyringe";
import { CandidateService } from "../service/candidate.service"

const candidateService = container.resolve(CandidateService);

const Query = {
    getCandidates: () => {
        return candidateService.getAllCandidates();
    }
}

export { Query }