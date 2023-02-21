import React, { useContext, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Image from "next/image";
import CartContext from "../../store/cart.context";

interface ProductImagesProps {
  image1: { tiny: string; medium: string; large: string };
  image2?: { tiny: string; medium: string; large: string };
  image3?: { tiny: string; medium: string; large: string };
  image4?: { tiny: string; medium: string; large: string };
  image5?: { tiny: string; medium: string; large: string };
  image6?: { tiny: string; medium: string; large: string };
  image7?: { tiny: string; medium: string; large: string };
}

interface ProductItemProps {
  id: number | string;
  index: number;
  images: ProductImagesProps; //object
  title: string;
  slug: string;
  price: number | string;
  inventory: number;
  collection: { title: string };
}

interface CartPageProps {
  cart: {
    items: {
      id: string;
      index: number;
      quantity: number;
      product: ProductItemProps;
    }[];
    totalPrice: string;
    itemsNumber: number;
  };
}

const CartPage: NextPage<CartPageProps> = (props) => {
  const [quantity, setQuantity] = useState(0);
  const cartCtx = useContext(CartContext);

  if (cartCtx.cart_items_size === 0 || !cartCtx.cart?.items)
    return (
      <div>
        <p className="text-center">No cart is created or car items is empty.</p>
      </div>
    );

  return (
    <div className="to">
      Cart Page
      {cartCtx.cart?.items?.map(
        (item: {
          id: string;
          index: number;
          quantity: number;
          product: ProductItemProps;
        }) => (
          <div key={item.id} className="">
            <div className="flex justify-between items-center mx-10 px-5 ">
              <Link
                href={`/products/${item.product.collection.title}/${item.product.index}/${item.product.slug}`}
                passHref={true}
              >
                <h2 className="w-1/4 font-bold	 cursor-pointer transition-colors duration-150 hover:text-orange-600">
                  {item.product.title}
                </h2>
              </Link>
              <div>
                <Image
                  src={item.product.images.image1.large}
                  alt=""
                  width={300}
                  height={250}
                  className="rounded-lg"
                ></Image>
              </div>
              <p>{item.product.collection.title}</p>
              <p>{item.product.price} TND</p>
              <input
                className={`w-20 h-9 px-2 mx-5 text-sm text-gray-700 placeholder-gray-600 rounded-lg border border-toggle focus:shadow-outline `}
                type="number"
                max={item.product.inventory}
                min={1}
                defaultValue={item.quantity}
                placeholder=""
                onChange={(e) => {
                  setQuantity(+e.currentTarget.value);
                }}
              />
              <button
                className="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                onClick={() => cartCtx.updateCartItem(item.index, quantity)}
              >
                Update
              </button>
              <button
                className="h-8 px-4 m-2 text-sm text-slate-900 transition-colors duration-150 bg-amber-500 rounded-lg focus:shadow-outline hover:bg-amber-600"
                onClick={() => cartCtx.deleteCartItem(item.index)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
      <p className="text-center">
        Total Price :
        <span className="inline-flex items-center justify-center mx-2 px-2 py-2 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {cartCtx.cart?.totalPrice ? `${cartCtx.cart.totalPrice} TND` : ""}
        </span>
      </p>
      <div className="text-center">
        <Link href="/check-out" passHref={true}>
          <button className="h-8 px-4 m-2 text-sm text-slate-900 transition-colors duration-150 bg-amber-500 rounded-lg focus:shadow-outline hover:bg-amber-600">
            {" "}
            Check Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
