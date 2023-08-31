import { ProductType } from "@/products/internal"

type DetailProductPropsType = {
  product: ProductType
}

const DetailProduct = ({ product }: DetailProductPropsType) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <img
      style={{
        width: "80px",
        height: "100px",
      }}
      src={product.thumbnail}
    />
    <h5>{product.title}</h5>
    <p>Category: {product.category}</p>
    <p>Brand: {product.brand}</p>
    <p>Price: ${product.price}</p>
    <p>{product.description}</p>
  </div>
)


export default DetailProduct