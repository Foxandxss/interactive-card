import { Faker, base, en, es } from '@faker-js/faker';

export const faker = new Faker({ locale: [es, en, base] });

// card
const searchParams = new URL(window.location.href).searchParams;
const card = searchParams.get('card');

if (card) {
  faker.card(Number(card));
  console.info(`🔹 Faker card '${card}' setted`);
} else {
  console.info(`🔹 Faker random card '${faker.card()}' setted. Use query param (Ex: ?card=123) to set a specific card`);
}
