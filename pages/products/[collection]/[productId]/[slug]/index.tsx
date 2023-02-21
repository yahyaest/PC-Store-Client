import React, { useContext, useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { gql } from "@apollo/client";
import ImageGallery from "react-image-gallery";
import client from "../../../../../graphQL/apollo-client";
import { FaShoppingCart } from "react-icons/fa";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import cartContext from "../../../../../store/cart.context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface ProductProps {
  product: {
    id: number | string;
    index: number;
    images: any; //object
    description: any;
    title: string;
    slug: string;
    price: number | string;
    inventory: number;
    promotions: { description: string; discount: number }[];
    collection: { title: string };
    tags: any[];
  };
}

const ProductPage: NextPage<ProductProps> = (props) => {
  const { product } = props;
  const [isValid, setIsValid] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<any[]>([]);
  const cartCtx = useContext(cartContext);

  useEffect(() => {
    let imagesGallery = [];
    for (let imageNumber of Object.keys(product.images)) {
      imagesGallery.push({
        original: product.images[imageNumber].medium,
        thumbnail: product.images[imageNumber].tiny,
      });
    }
    setImages(imagesGallery);
  }, []);

  const handleAddToCart = async (productId: number, quantity: number) => {
    const COOKIE_NAME = "cart_items";
    if (!Cookies.get(COOKIE_NAME)) {
      try {
        await cartCtx.createCart();
        toast.success("New Cart created");
        await cartCtx.addCartItem(productId, quantity);
        toast.success("Item added to Cart successfully");
      } catch (err: any) {
        console.log(err);
    //     toast.error(err.errors[0].message)
      }
    } else {
      try {
        await cartCtx.addCartItem(productId, quantity);
        toast.success("Item added to Cart successfully");
      } catch (err: any) {
        console.log(err);
        toast.error(err.errors[0].message);
      }
    }
  };

  return (
    <div className="container  mx-auto  lg:mx-10 ">
      <div className="flex flex-col-reverse items-center lg:flex-row justify-evenly">
        <div className="product-gallery w-3/4 lg:w-1/2">
          <ImageGallery items={images} />
        </div>
        <div className="product-info">
          <h1 className="font-bold text-md text-center mb-7 md:text-xl lg:text-2xl">
            {product.title}
          </h1>
          <div className="product-price">
            {product.promotions.length > 0 && (
              <div className=" flex justify-center items-center  my-5 ">
                <p className="font-bold text-2xl text-red-700 mx-5 xl:text-3xl">
                  {parseInt(product.price as string) -
                    (parseInt(product.price as string) *
                      product.promotions[0]?.discount) /
                      100}{" "}
                  TND
                </p>
                <del className="mx-5">{product.price} TND</del>
              </div>
            )}
            {product.promotions.length <= 0 && (
              <p className="font-bold text-3xl text-red-700 my-5 ">
                {product.price} TND
              </p>
            )}
          </div>

          <div className="product-inventory text-center ">
            {product.inventory > 0 ? (
              <p className="font-bold">
                {product.inventory} item left in stock
              </p>
            ) : (
              <p className="font-bold">No item left in stock</p>
            )}
          </div>

          <div className="product-cart flex justify-center items-center text-center  my-5">
            <div className="cart-input">
              <label htmlFor="forms-labelLeftInputCode">Quantity</label>

              <input
                className={`w-20 h-9 px-2 mx-5 text-sm text-gray-700 placeholder-gray-600 rounded-lg border border-toggle focus:shadow-outline ${
                  isValid ? "" : "border-red-700"
                }`}
                type="number"
                max={product.inventory}
                min={1}
                defaultValue={1}
                placeholder=""
                onChange={(e) => {
                  if (
                    parseInt(e.currentTarget.value) < 1 ||
                    parseInt(e.currentTarget.value) > product.inventory
                  ) {
                    setIsValid(false);
                    e.currentTarget.value = "1";
                    setTimeout(() => {
                      setIsValid(true);
                    }, 1500);
                  } else {
                    setIsValid(true);
                    setQuantity(+e.currentTarget.value);
                  }
                }}
              />
              {!isValid && (
                <div className="text-xs text-red-700 my-2">
                  Quantity should be between 1 and {product.inventory}.
                </div>
              )}
            </div>
            <button
              className="inline-flex items-center h-10 px-5 text-teal-300 transition-colors duration-150 bg-sky-600 rounded-lg focus:shadow-outline hover:bg-sky-700"
              onClick={() => handleAddToCart(product.index, quantity)}
            >
              <FaShoppingCart></FaShoppingCart>
              <span className="ml-3 text-xs">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="product-description my-10">
        <h2 className="font-bold text-2xl text-cyan-700 mx-16 my-5">
          Technical Sheet
        </h2>
        {Object.keys(product.description).map((item) => (
          <p key={item} className="mx-16 my-2">
            <span className="font-bold">{item}</span> :{" "}
            {product.description[item]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async ({ params }: any) => {
  let paths: any[] = [];
  // Get all collections
  const collectionsData = await client.query({
    query: gql`
      query {
        collections {
          id
          title
        }
      }
    `,
  });

  //
  for (let collection of collectionsData.data.collections) {
    // Get products count
    const { data } = await client.query({
      query: gql`
       query {
         products(collection_Title: "${collection.title}", first: 1) {
           edges {
             node {
               productsCollectionCount
             }
           }
         }
       }
     `,
    });
    const productsCount = data.products.edges[0].node.productsCollectionCount;
    // Get all product
    let endCursor = "";

    for (let index = 0; index < productsCount / 100; index++) {
      const { data } = await client.query({
        query: gql`
     query {
       fullProducts(collection_Title:"${collection.title}",first: 100, after: "${endCursor}" ) {
         edges {
           node {
             id
             index
             slug
          
           
           }
         }

         pageInfo {
           endCursor
         }
       }
     }
   `,
      });

      endCursor = data.fullProducts.pageInfo.endCursor;

      for (let product of data.fullProducts.edges) {
        paths.push({
          params: {
            collection: collection.title,
            productId: product.node.index.toString(),
            slug: product.node.slug,
          },
        });
      }
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
}: any) => {
  // Get  product
  const { data, loading, errors } = await client.query({
    query: gql`
      query {
        product(id: ${parseInt(params.productId)}) {
          id
          index
          title
          slug
          description
          price
          inventory
          images
          promotions {
            description
            discount
          }
        }
      }
    `,
  });

  let product = { ...data.product };
  product.images = JSON.parse(product.images);
  product.description = JSON.parse(product.description);

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
