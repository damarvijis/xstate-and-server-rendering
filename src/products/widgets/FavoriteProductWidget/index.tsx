import { createMachineFavorite } from "./favoriteMachine";
import { useMachine } from "@xstate/react";
import { useProductContext } from "../Context";
import ProductList from "@/products/components/ProductList";

export const FavoriteProductWidget = () => {
  const context = useProductContext()
  const machineFavorite = createMachineFavorite(context)
  const [state, send] = useMachine(machineFavorite)

  return (
    <>
      {(state.matches("idle") || state.matches("loading")) && <p>Loading...</p>}
      {state.matches("error") &&
        <div>
          <p>{state.context.errorMessage}</p>
          <button onClick={() => send({ type: "REFETCH" })}>Refetch</button>
        </div>
      }
      {state.matches("empty") && <p>Product favorite nya masih kosong maszeh</p>}
      {
        (state.matches("success") || (state.matches("deleting"))) &&
        <ProductList
          onToggleFavorite={(id) => send({ type: "DELETE_FAVORITE", payload: { id } })}
          products={state.context.products}
        />
      }
    </>
  )
}