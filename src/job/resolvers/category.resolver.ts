import { Container } from "typedi";
import { CategoryService } from "../service/category.service";

const categoryService = Container.get(CategoryService);

const Query = {
    getAllCategories: () => {
        return categoryService.getAllCategories();
    }
}

const Mutation = {
    createCategory: (parent: unknown, args: { input: CategoryDto; }) => {
        return categoryService.createCategory(args.input);
    },
    updateCategory: (parent: unknown, args: { id: number; input: CategoryDto}) => {
        return categoryService.updateCategory(args.id, args.input);
    },
    deleteCategory: (parent: unknown, args: { id: number; }) => {
        return categoryService.deleteCategory(args.id);
    }
}

export {
    Query,
    Mutation
}