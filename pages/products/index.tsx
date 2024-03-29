import React from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../graphQL/apollo-client";

interface ProductsProps {
  products: any[];
  collections: any[];
  productsCount: number;
  isPending: boolean;
}

const Products: NextPage<ProductsProps> = (props) => {
  const { collections } = props;

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold">Collections</h1>
      <div>
        {collections.map((collection) => (
          <p key={collection.id} className="text-center font-bold">
            <Link href={`/products/${collection.title}`}>
              {collection.title}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Products;

export const getStaticProps: GetStaticProps = async () => {
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

  if (collectionsData.error) {
    console.error(collectionsData.error);
  }

  return {
    props: {
      collections: collectionsData.data.collections,
    },
  };
};
