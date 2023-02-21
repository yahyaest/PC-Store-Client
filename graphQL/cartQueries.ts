import { gql } from "@apollo/client";

const getCartQuery = gql`
  query cart($cartId: UUID) {
    cart(id: $cartId) {
      items {
        id
        index
        quantity
        product {
          index
          title
          slug
          price
          inventory
          collection {
            title
          }
          images
        }
      }
      totalPrice
      itemsNumber
    }
  }
`;

const createCartMutation = gql`
  mutation createCart {
    createCart(name: "5") {
      cart {
        id
      }
    }
  }
`;

const deleteCartMutation = gql`
  mutation deleteCart($cartId: UUID!) {
    deleteCart(id: $cartId) {
      cart {
        id
      }
    }
  }
`;

const addCartItemMutation = gql`
  mutation createCartItem($cartId: UUID!, $productId: Int!, $quantity: Int!) {
    createCartItem(
      cartId: $cartId
      productId: $productId
      quantity: $quantity
    ) {
      cartItem {
        id
        cartId
        productId
        quantity
      }
    }
  }
`;

const updateCartItemMutation = gql`
  mutation updateCartItem($cartItemId: ID!, $quantity: Int!) {
    updateCartItem(id: $cartItemId, quantity: $quantity) {
      cartItem {
        id
        cartId
        productId
        quantity
      }
    }
  }
`;

const deleteCartItemMutation = gql`
  mutation deleteCartItem($cartItemId: ID!) {
    deleteCartItem(id: $cartItemId) {
      cartItem {
        id
      }
    }
  }
`;

export {
 getCartQuery,
createCartMutation,
deleteCartMutation,
addCartItemMutation,
updateCartItemMutation,
deleteCartItemMutation
}