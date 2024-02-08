import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 10);

const input = {
    id: "123",
    name: "Product 2",
    price: 20
}

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("Unit test for update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: "123",
            name: "Product 2",
            price: 20
        });
    })
})