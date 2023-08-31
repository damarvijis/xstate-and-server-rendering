import Navbar from "../../components/Navbar"
import DetailProduct from "../../components/DetailProduct"
import { FindProductById, ProductType } from "@/products/internal"

export type ProductDetailScreenPropsType = {
  product: ProductType
}

export const getProductDetailInitialProps = async (id: number) => {
  const product: ProductType = await FindProductById({ id })
    .then(res => res.json())

  return { product }
}

const ProductDetailScreen = (props: ProductDetailScreenPropsType) => {
  // const router = useRouter() // kalo fallback true
  // if (router.isFallback) return <p>Loading...</p>

  return (
    <div>
      <h3>Product Detail</h3>
      <Navbar />
      <p>{"ini detail product " + props.product.title}</p>
      <DetailProduct product={props.product} />
    </div>
  )
}

export default ProductDetailScreen