import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPizzas from "./pizzas.reducer";

export interface ProductsState {
  pizzas: fromPizzas.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
// founded in products.module.ts ...forFeature('products')

// pizza State achieving by: get me the products and from it get me the pizzas
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

// to sellect all of the pizzas as an array - to use it in "ng-for"
export const getAllPizzas = createSelector(
  getPizzasEntities, // receive from sellector
  entities => { // use our own function to map through object and get pizzas
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]); // parse "str" -> "number"
});


export const getAllPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getAllPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
