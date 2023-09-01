import { GetStaticProps, GetStaticPaths } from "next"
import { ParsedUrlQuery } from 'querystring'
import { ListProduct, ProductType } from "@/products/internal"
import { ProductDetailScreen } from "@/products/screens"
import { ProductDetailScreenPropsType, getProductDetailInitialProps } from "@/products/screens/ProductDetailScreen"

type ProductListResponseType = {
  products: ProductType[]
  skip: number
  total: number
  limit: number
}

type RouteQuery = {
  id: string;
} & ParsedUrlQuery

export const getStaticPaths: GetStaticPaths<RouteQuery> = async () => {
  try {
    const responseProduct: ProductListResponseType = await ListProduct({ limit: 1000, skip: 0, search: "" }).then(res => res.json())
    const paths = responseProduct.products.map((product) => ({ params: { id: `${product.id}` } }));
    return {
      paths,
      // fallback: true  // kasih isFallback di router
      // fallback: false // false => page 404
      fallback: "blocking" // kaya cara kerja SSR
    }
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps<{ product: ProductType }, RouteQuery> = async (ctx) => {
  if (!ctx.params) throw new Error("Gaada Context Params")
  const { id } = ctx.params
  const props: ProductDetailScreenPropsType = await getProductDetailInitialProps(+id)
  return {
    props,
    revalidate: 3600
  }
}

export default ProductDetailScreen
