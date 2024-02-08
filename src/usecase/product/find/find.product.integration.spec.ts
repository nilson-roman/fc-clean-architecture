import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test for find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const input = { id: "123" };

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: "123",
            name: "Product 1",
            price: 10
        });

    });

    it("should not find a product", async () => {
        const productRepository = new ProductRepository();
        
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const input = { id: "456" };

        const useCase = new FindProductUseCase(productRepository);
        
        expect(() => {
           return useCase.execute(input);
        }).rejects.toThrow("Product not found");

    });
})