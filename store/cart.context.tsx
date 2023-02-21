import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import client from "../graphQL/apollo-client";
import { useQuery, useMutation } from "@apollo/client";
import { 
 getCartQuery,
createCartMutation,
deleteCartMutation,
addCartItemMutation,
updateCartItemMutation,
deleteCartItemMutation
} from "../graphQL/cartQueries"

interface ProductItemProps {
  id: number | string;
  index: number;
  images: any; //object
  title: string;
  slug: string;
  price: number | string;
  collection: { title: string };
}

interface CartPageProps {
  cart: {
    items: { id: string; quantity: number; product: ProductItemProps }[];
    totalPrice: string;
    itemsNumber: number;
  };
}

const COOKIE_NAME = "cart_items";

const handleCartData = (cart:any) => {
  // parse images to json
  let parsedCart: {
    items: any[];
    totalPrice: string;
    itemsNumber:number

  } = { items: [], totalPrice: "0.0" ,itemsNumber:0};

  let items = [];
  for (let item of cart.items) {
    let currentProduct = { ...item.product };
    currentProduct.images = JSON.parse(item.product.images);
    items.push({
      id: item.id,
      index:item.index,
      quantity: item.quantity,
      product: currentProduct,
    });
  }

  parsedCart.items = items;
  parsedCart.totalPrice = cart.totalPrice; 
  parsedCart.itemsNumber = cart.itemsNumber; 

  return parsedCart
}

const CartContext = createContext({
  cart: {} as any,
  cart_items_size: 0,
  cart_total_price: 0,
  createCart: function () {},
  deleteCart: function () {},
  addCartItem: function (productId: number, quantity: number) {},
  updateCartItem: function (cartItemId: number, quantity: number) {},
  deleteCartItem: function (cartItemId: number) {},
});

export function CartContextProvider(props: any) {
  const [currentCart, setCurrentCart] = useState<CartPageProps | null>(null);
  const [itemsNumber, setItemsNumber] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cartData = useQuery(getCartQuery, {
    variables: {
      cartId: Cookies.get(COOKIE_NAME) ? Cookies.get(COOKIE_NAME) : "",
    },
  });
  const [addCartItem, result] = useMutation(addCartItemMutation, {
    refetchQueries: [
      {
        query: getCartQuery,
        variables: {
          cartId: Cookies.get(COOKIE_NAME) ? Cookies.get(COOKIE_NAME) : "",
        },
      },
    ],
  });
 const [updateCartItem, result1] = useMutation(updateCartItemMutation, {
    refetchQueries: [
      {
        query: getCartQuery,
        variables: {
          cartId: Cookies.get(COOKIE_NAME) ? Cookies.get(COOKIE_NAME) : "",
        },
      },
    ],
  });
   const [deleteCartItem, result2] = useMutation(deleteCartItemMutation, {
    refetchQueries: [
      {
        query: getCartQuery,
        variables: {
          cartId: Cookies.get(COOKIE_NAME) ? Cookies.get(COOKIE_NAME) : "",
        },
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      if (!Cookies.get(COOKIE_NAME)) {
        setCurrentCart({} as any);
        setItemsNumber(0);
        setTotalPrice(0);
      } else {
        if (cartData.data) {
          const cart = handleCartData(cartData.data.cart) as any
          setCurrentCart(cart);
          setItemsNumber(cart.itemsNumber);
          setTotalPrice(cart.totalPrice)
        }
      }
    }
    fetchData();
  }, [cartData]);

  async function createCartHandler() {
    if (!Cookies.get(COOKIE_NAME)) {
      const createdCart = await client.mutate({
        mutation: createCartMutation,
      });

      const cartId = createdCart.data.createCart.cart.id;
      Cookies.set(COOKIE_NAME, cartId, { expires: 3 });

      setCurrentCart({} as any);
      setItemsNumber(0);
      setTotalPrice(0);
    }
  }

  async function deleteCartHandler() {
    if (!Cookies.get(COOKIE_NAME)) {
      return toast.error("There is no cart stored. ");
    }

    const cartId = Cookies.get(COOKIE_NAME);
    const deletedCart = await client.mutate({
      mutation: deleteCartMutation,
    });

    Cookies.remove(COOKIE_NAME);

    setCurrentCart({} as any);
    setItemsNumber(0);
    setTotalPrice(0);
  }

  async function addCartItemHandler(productId: number, quantity: number) {
    if (!Cookies.get(COOKIE_NAME)) {
      return toast.error("There is no cart stored. ");
    }
    const cartId = Cookies.get(COOKIE_NAME);

    await addCartItem({ variables: { cartId, productId, quantity } });
    setCurrentCart(cartData.data.cart);
    setItemsNumber(cartData.data.cart.itemsNumber);
    setTotalPrice(cartData.data.cart.totalPrice);
  }

  async function updateCartItemHandler(cartItemId: number, quantity: number) {
    if (!Cookies.get(COOKIE_NAME)) {
      return toast.error("There is no cart stored. ");
    }

    await updateCartItem({ variables: { cartItemId, quantity } });
    setCurrentCart(cartData.data.cart);
    setItemsNumber(cartData.data.cart.itemsNumber);
    setTotalPrice(cartData.data.cart.totalPrice);
  }

  async function deleteCartItemHandler(cartItemId: number) {
    if (!Cookies.get(COOKIE_NAME)) {
      return toast.error("There is no cart stored. ");
    }

    await deleteCartItem({ variables: { cartItemId } });
    setCurrentCart(cartData.data.cart);
    setItemsNumber(cartData.data.cart.itemsNumber);
    setTotalPrice(cartData.data.cart.totalPrice);
  }

  const context = {
    cart: currentCart,
    cart_items_size: itemsNumber,
    cart_total_price:totalPrice,
    createCart: createCartHandler,
    deleteCart: deleteCartHandler,
    addCartItem: addCartItemHandler,
    updateCartItem: updateCartItemHandler,
    deleteCartItem: deleteCartItemHandler,
  };

  return (
    <CartContext.Provider value={context as any}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
