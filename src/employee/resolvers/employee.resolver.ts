import { Container } from "typedi";
import { EmployeeService } from "../service/employee.service";

const employeeService = Container.get(EmployeeService);

const Query = {
    getEmployees: () => {
        return employeeService.getAllEmployees();
    },
    getEmployee: (parent: unknown, args: { id: number; }) => {
        return employeeService.getEmployeeById(args.id);
    }
}

const Mutation = {
    employeeSignup: (parent: unknown, args: { input: CreateEmployeeDto; }) => {
        return employeeService.createEmployee(args.input);
    },
    updateEmployee: (parent: unknown, args: { id: number; input: UpdateEmployeeDto}) => {
        return employeeService.updateEmployee(args.id, args.input);
    },
    deleteEmployee: (parent: unknown, args: { id: number; }) => {
        return employeeService.deleteEmployee(args.id);
    }
}

export {
    Query,
    Mutation
}