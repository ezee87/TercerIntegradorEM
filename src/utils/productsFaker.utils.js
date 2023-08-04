import { faker } from "@faker-js/faker";
faker.location = "es";

export const generateProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.productMaterial(),
    price: faker.commerce.price({ min: 100, max: 9000 }),
    stock: Math.random(1, 100)
  };
}
