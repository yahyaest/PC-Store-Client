import { gql } from "@apollo/client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import client from "../../graphQL/apollo-client";

interface ProductCardProps {
  product: {
    id: number | string;
    index: number;
    images: any; //object
    title: string;
    slug: string;
    price: number | string;
    inventory: number;
    promotions: { description: string; discount: number }[];
    collection: { title: string };
    tags: any[];
  };
}

const ProductCard: NextPage<ProductCardProps> = (props) => {
  const { product } = props;

  const [productTags, setProductTags] = useState<any[]>([]);

  useEffect(() => {
    async function fectchProductTags() {
      const { data, loading, errors } = await client.query({
        query: gql`
          query {
            productTags(id: ${product.index}) {
              title
              tags {
                id
                label
              }
            }
          }
        `,
      });
      setProductTags(data.productTags.tags);
    }
    fectchProductTags();
  }, [product]);

  return (
    <Link
      href={`/products/${product.collection.title}/${product.index}/${product.slug}`}
      passHref={true}
    >
      <div
        key={product.id}
        className="w-96 mb-5 mx-3 py-5 box-border overflow-hidden  rounded-md cursor-pointer text-center bg-gray-50 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-product hover:bg-gray-100"
      >
        <div>
          <Image
            src={product.images.image1.large}
            alt=""
            width={300}
            height={250}
            className="rounded-lg"
          ></Image>
        </div>
        <div>
          {" "}
          <h2 className="px-2  text-red-900">{product.title}</h2>
        </div>
        <div>
          {product.promotions.length > 0 && (
            <p className="font-bold">
              {parseInt(product.price as string) -
                (parseInt(product.price as string) *
                  product.promotions[0]?.discount) /
                  100}{" "}
              TND (-{product.promotions[0]?.discount}%)
            </p>
          )}
          {product.promotions.length > 0 ? (
            <del>{product.price} TND</del>
          ) : (
            <p className="font-bold">{product.price} TND</p>
          )}

          {product.inventory > 0 ? (
            <p>{product.inventory} item left in stock</p>
          ) : (
            <p>No item left in stock</p>
          )}
        </div>
        <div id="tags">
          {productTags.length > 0 &&
            productTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center justify-center mx-2 px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
              >
                {tag.label}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
