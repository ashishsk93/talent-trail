import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service({ global: true })
export class CategoryService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getAllCategories () {
        return this.prisma.category.findMany();
    }

    createCategory (input: CategoryDto) {
        return this.prisma.category.create({
            data: input
        });
    }

    updateCategory (id: number, input: CategoryDto) {
        return this.prisma.category.update({
            where: {
                id
            },
            data: input
        })
    }

    deleteCategory (id: number) {
        return this.prisma.category.delete({
            where: {
                id
            }
        });
    }
}