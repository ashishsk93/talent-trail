interface CreateJobDto {
  title: string;
  description: string;
  requirements?: string[];
  qualifications?: string[];
  skills?: string[];
  location?: any;
  categoryId: number;
  info?: any;
  experience: number;
  type: string;
}

interface UpdateJobDto {
  title?: string;
  description?: string;
  requirements?: string[];
  qualifications?: string[];
  skills?: string[];
  location?: any;
  categoryId?: number;
  info?: any;
  experience?: number;
  type?: string;
}
