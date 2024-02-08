export interface InputListProductDto {}

type Product = {
    id: string
    name: string
    price: number
}

export type OutputListProductDto = {
    products: Product[]
}