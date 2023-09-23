interface CandidateCreateDto {
  name: string;
  age: number;
  email: string;
  phone: string;
  password: string;
}

interface CandidateUpdateDto {
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
  password?: string;
}
