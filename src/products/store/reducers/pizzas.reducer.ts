import {Pizza} from "../../models/pizza.model";
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzaState {
  // data: Pizza[],
  entities: { [id: number]: Pizza };
  loaded: boolean,
  loading: boolean
};


export const initialState: PizzaState = {
  // data: []
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {

  switch(action.type) {
    case fromPizzas.LOAD_PIZZAS: { // it will listen of getting data from the server
      return {
        ...state,
        loading: true
      }
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: { // we received new action.payload as a response from pizza service by act.effect
      // const data = action.payload;
      const pizzas = action.payload;

      // to flatter array into object:
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza,
          };
        },
        {
          ...state.entities,
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        // data,
        entities,
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

  }

  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state:PizzaState) => state.loading;
export const getPizzasLoaded = (state:PizzaState) => state.loaded;
// export const getPizzas = (state:PizzaState) => state.data;
