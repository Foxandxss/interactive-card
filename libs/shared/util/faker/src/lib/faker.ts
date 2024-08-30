import { Faker, base, en, es } from '@faker-js/faker';

export const faker = new Faker({ locale: [es, en, base] });

// seed
const searchParams = new URL(window.location.href).searchParams;
const seed = searchParams.get('seed');

if (seed) {
  faker.seed(Number(seed));
  console.info(`🔹 Faker seed '${seed}' setted`);
} else {
  console.info(`🔹 Faker random seed '${faker.seed()}' setted. Use query param (Ex: ?seed=123) to set a specific seed`);
}
