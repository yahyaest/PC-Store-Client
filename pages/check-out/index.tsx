import React, { useContext } from 'react'
import { NextPage } from "next";
import Image from "next/image";
import CartContext from '../../store/cart.context';
import UserContext from '../../store/user.context';

const CheckOut: NextPage = () => {
  const cartCtx = useContext(CartContext);
  const usertCtx = useContext(UserContext);

 const handlleOrder=()=>{
  // remove cart
  cartCtx.deleteCart()
  // redirect to home
 }

  return (
    <div className="text-center">
      <h1>Order Summary</h1>
      <p className="font-bold">
        You have {cartCtx.cart_items_size} in your shopping cart.
      </p>
      {cartCtx.cart?.items?.map(
        (item: {
          id: string;
          index: number;
          quantity: number;
          product: any;
        }) => (
          <div key={item.id} className="">
            <div className="flex items-center justify-center	mx-10 my-2 px-5 ">
              <div>
                <Image
                  src={item.product.images.image1.large}
                  alt=""
                  width={75}
                  height={75}
                  className="rounded-full bg-cover check-out_img"
                ></Image>
              </div>
              <h4 className="w-1/3 mx-4 font-bold	">{item.product.title}</h4>
              <p className="mx-3">x{item.quantity} </p>
              <p>{item.product.price} TND</p>
            </div>
          </div>
        )
      )}

      <p className="font-bold"> Total Price : {cartCtx.cart_total_price} TND</p>

      <form className="w-full max-w-sm m-auto my-5">
        <h1>Shipping</h1>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              defaultValue={usertCtx!.user?.username}
            ></input>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Address
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="..."
            ></input>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Phone
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="..."
            ></input>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context:any) {
  const token = context.req.cookies['auth-token'];

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {  },
  };
}

export default CheckOut