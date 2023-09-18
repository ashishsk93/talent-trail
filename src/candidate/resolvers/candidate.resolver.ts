import { CandidateService } from "../service/candidate.service"

const Query = {
    getCandidates: () => {
        const candidateService = new CandidateService();
        return candidateService.getAllCandidates();
    }
}

export { Query }