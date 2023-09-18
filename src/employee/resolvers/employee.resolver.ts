import { EmployeeService } from "../service/employee.service";

const employeeService = new EmployeeService();

const Query = {
    getEmployees: () => {
        return employeeService.getAllEmployees();
    }
}

const Mutation = {
    employeeSignup: (parent: unknown, args: { input: CreateEmployeeDto; }) => {
        return employeeService.createEmployee(args.input);
    }
}

export { Query, Mutation }