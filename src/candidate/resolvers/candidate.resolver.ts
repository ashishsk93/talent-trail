import { Container } from "typedi";
import { CandidateService } from "../service/candidate.service";

const candidateService = Container.get(CandidateService);

const Query = {
  getCandidates: () => {
    return candidateService.getAllCandidates();
  },
};

const Mutation = {
  candidateSignUp: (parent: unknown, args: { input: CandidateCreateDto }) => {
    return candidateService.createCandidate(args.input);
  },
  updateCandidate: (
    parent: unknown,
    args: { id: number; input: CandidateUpdateDto }
  ) => {
    return candidateService.updateCandidate(args.id, args.input);
  },
  deleteCandidate: (parent: unknown, args: { id: number }) => {
    return candidateService.deleteCandidate(args.id);
  },
};

export { Query, Mutation };
