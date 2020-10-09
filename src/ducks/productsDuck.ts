import axios from "axios";
import { URL } from "../utils/constants";
import { product } from "../components/Home/Home";

//actions
const productsLOAD = "products/LOAD";
const isLoadingProducts = "products/LOADING";
const productsAddToCart = "add/CART";
const productsRemoveFromCart = "del/CART";

//reducer
export default function reducer(
  state = {
    products: [],
    cartItems: [] as product[],
    totalPrice: null,
    loading: false,
  },
  action: any
) {
  const newState = { ...state };
  switch (action.type) {
    case productsLOAD:
      newState.products = action.products;
      return newState;
    case isLoadingProducts:
      newState.loading = action.loading;
      return newState;
    case productsAddToCart:
      const productId = action.product.id;
      if (newState.cartItems.findIndex((product) => product.id === productId)) {
        newState.cartItems.push(action.product);
      }
    case productsRemoveFromCart:
      newState.cartItems = newState.cartItems.filter(
        (product: product) => product.id !== action.productId
      );
    default:
      return newState;
  }
}

//action creator
export function loadProducts(products: []) {
  return { type: productsLOAD, products };
}

export function isLoading(loading: boolean) {
  return { type: isLoadingProducts, loading };
}

export function addProductToCart(product: product) {
  return { type: productsAddToCart, product };
}

export function removeProductFromCart(productId: number) {
  return { type: productsRemoveFromCart, productId };
}

//thunks
export function getProducts() {
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    const { data } = await axios.get(URL.getProducts);
    if (data) {
      dispatch(isLoading(false));
      dispatch(loadProducts(data));
    }
  };
}

export function addToCart(product: product) {
  return (dispatch: any) => {
    dispatch(addProductToCart(product));
  };
}

export function removeFromCart(productId: number) {
  return (dispatch: any) => {
    dispatch(removeProductFromCart(productId));
  };
}
