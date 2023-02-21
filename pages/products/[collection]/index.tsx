import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import client from "../../../graphQL/apollo-client";
import ProductCard from "../../../components/product/product-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ProductCollectionPageProps {
  products: any[];
}

const ProductCollectionPage: NextPage<ProductCollectionPageProps> = (props) => {
  const router = useRouter();
  const params = router.query;
  const { products } = props;

  if (products.length < 0) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold">
        {products.length} {params.collection}
      </h1>
      <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <ProductCard key={index} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductCollectionPage;

export const getStaticPaths: GetStaticPaths = async () => {
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

  const paths = collectionsData.data.collections.map((collection: any) => ({
    params: { collection: collection.title },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
}: any) => {
  // Get products count

  const { data, loading, errors } = await client.query({
    query: gql`
     query {
       products(collection_Title:"${params.collection}",first: 1) {
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
  console.log({ productsCount });

  // Get all product
  let products = [];
  let endCursor = "";
  let isPending = true;

  for (let index = 0; index < productsCount / 100; index++) {
    const { data, loading, errors } = await client.query({
      query: gql`
     query {
       fullProducts(collection_Title:"${params.collection}",first: 100, after: "${endCursor}" ) {
         edges {
           node {
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
            collection{
             title
            }
           
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
      let currentProduct = { ...product };
      let currentNode = { ...currentProduct.node };
      currentNode.images = JSON.parse(product.node.images);
      currentNode.description = JSON.parse(product.node.description);
      products.push(currentNode);
    }
  }
  isPending = false;

  return {
    props: {
      products,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
