// Invalidation values must ve a proper fetch url
// or follow lowercase:string. https://github.com/sveltejs/kit/issues/6354
export enum LoadDepends {
  DiceSets = "invalidation:dice",
  CardsSet = "invalidation:cards",
}
