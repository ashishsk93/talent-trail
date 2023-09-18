import { PrismaClient } from "@prisma/client";

export class EmployeeService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getAllEmployees() {
        return this.prisma.employee.findMany();
    }

    createEmployee(input: CreateEmployeeDto) {
        return this.prisma.employee.create({
            data: input
        });
    }
} 