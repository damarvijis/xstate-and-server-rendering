import Navbar from "@/products/components/Navbar"
import { ProductListWidget } from "@/products/widgets/ProductListWidget"
import Link from "next/link"
import { ProductType, ListProduct, constData } from "@/products/internal"

export type ProductListScreenPropsType = {
  products: ProductType[]
  totalData: number
}

export const getProductListInitialProps = async () => {
  const productsInit = await ListProduct({ limit: constData.limit, skip: 0, search: "" })
  const data = await productsInit.json()
  // throw new Error("test error") // <=== test

  return {
    products: data.products,
    totalData: data.total
  }
}

const ProductListScreen = (props: ProductListScreenPropsType) => (
  <div>
    <h3>List Product</h3>
    <Link href="/">Back to Home</Link>
    <Navbar />
    <ProductListWidget {...props} />
  </div>
)

export default ProductListScreen