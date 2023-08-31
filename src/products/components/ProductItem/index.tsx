import { ProductType } from "@/products/internal/type"
import { useRouter } from "next/router"
import { useProductContext } from "@/products/widgets/Context"

type ProductItemPropsType = {
  product: ProductType
  isFavorite: boolean
  toggleFavorite?: (id: number) => void
}

const ProductItem = ({
  product,
  isFavorite,
  toggleFavorite
}: ProductItemPropsType) => {
  const { push } = useRouter()
  const { onToggleFavorite } = useProductContext()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px"
      }}
    >
      <img
        src={product.thumbnail}
        style={{
          width: "80px",
          height: "100px"
        }}
      />
      <h5 style={{ margin: "0 !important" }}>{product.title}</h5>
      <p>{product.description}</p>
      <button onClick={() => {
        toggleFavorite ? toggleFavorite(product.id) : onToggleFavorite(product.id)
      }}
      >
        {isFavorite ? "Delete from favorite" : "Add to favorite"}
      </button>
      <button onClick={() => {
        push(`/product/${product.id}`)
      }}
      >
        {"See Detail " + product.title}
      </button>
    </div>
  )
}


export default ProductItem