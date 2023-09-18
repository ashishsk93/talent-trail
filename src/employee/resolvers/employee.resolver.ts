import { container } from "tsyringe";
import { EmployeeService } from "../service/employee.service";

const employeeService = container.resolve(EmployeeService);

const Query = {
    getEmployees: () => {
        return employeeService.getAllEmployees();
    }
}

const Mutation = {
    employeeSignup: (parent: unknown, args: { input: CreateEmployeeDto; }) => {
        return employeeService.createEmployee(args.input);
    },
    deleteEmployee: (parent: unknown, args: { id: number; }) => {
        return employeeService.deleteEmployee(args.id);
    }
}

export {
    Query,
    Mutation
}