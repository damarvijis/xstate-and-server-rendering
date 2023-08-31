import { GetServerSideProps } from "next"
import { ProductListScreen } from "@/products/screens"
import { ProductType, ListProduct, constData } from "@/products/internal"
import { getProductListInitialProps } from "@/products/screens/ProductListScreen"

type ProductListPropsType = {
  products: ProductType[]
  totalData: number
}

export const getServerSideProps: GetServerSideProps<ProductListPropsType> = async () => {
  try {
    const props = await getProductListInitialProps()
    // throw new Error("test error") // <=== test

    return { props }
  } catch (error) {
    console.log(error, 'error serverSide')

    return {
      props: {
        products: [],
        totalData: 0
      }
    }
  }
}

export default ProductListScreen
