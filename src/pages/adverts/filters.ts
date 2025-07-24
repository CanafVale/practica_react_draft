import type { Advert, Filters } from "./types";

const filterByName = (name: Filters["name"]) => (advert: Advert) => {
  if (!name) {
    return true;
  }
  const nameRegExp = new RegExp(name.trim(), "i");
  return nameRegExp.test(advert.name);
};

const filterBySale = (sale: Filters["sale"]) => (advert: Advert) => {
  if (sale === undefined) {
    return true;
  }
  return sale ? advert.sale : !advert.sale;
};

const filterByPrice = (prices: Filters["price"]) => (advert: Advert) => {
  if (!prices) {
    return true;
  }
  const [min, max] = prices;
  return advert.price >= min && advert.price <= max;
};

const filterByTags = (tags: Filters["tags"]) => (advert: Advert) => {
  if (!tags || !tags.length) {
    return true;
  }
  return tags.every((tag) => advert.tags.includes(tag));
};

export function filterAdverts(adverts: Advert[], filters: Filters | null) {
  if (!filters) {
    return adverts;
  }
  return adverts
    .filter(filterByName(filters.name))
    .filter(filterBySale(filters.sale))
    .filter(filterByPrice(filters.price))
    .filter(filterByTags(filters.tags));
}
