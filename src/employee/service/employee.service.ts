import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service({ global: true })
export class EmployeeService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getAllEmployees() {
        return this.prisma.employee.findMany();
    }

    getEmployeeById(id: number) {
        return this.prisma.employee.findUnique({
            where: {
                id
            }
        });
    }

    createEmployee(input: CreateEmployeeDto) {
        return this.prisma.employee.create({
            data: input
        });
    }

    updateEmployee(id: number, input: UpdateEmployeeDto) {
        return this.prisma.employee.update({
            where: {
                id
            },
            data: input
        })
    }

    deleteEmployee(id: number) {
        return this.prisma.employee.delete({
            where: {
                id
            }
        });
    }
}