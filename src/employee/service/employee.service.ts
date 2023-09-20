import { PrismaClient } from "@prisma/client";
import Container, { Service } from "typedi";

@Service({ global: true })
export class EmployeeService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = Container.get('prisma');
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