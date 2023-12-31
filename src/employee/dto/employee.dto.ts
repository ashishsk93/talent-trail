interface CreateEmployeeDto {
  email: string;
  name: string;
  password: string;
  roles: string[];
  skills: string[];
  experience: number;
}

interface UpdateEmployeeDto {
  email?: string;
  name?: string;
  password?: string;
  roles?: string[];
  skills?: string[];
}
