import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
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

    deleteEmployee(id: number) {
        return this.prisma.employee.delete({
            where: {
                id
            }
        });
    }
}