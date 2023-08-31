import { createMachineList } from "./listMachine";
import { useMachine } from "@xstate/react";
import { ProductType } from "@/products/internal";
import { useProductContext } from "../Context";
import ProductList from "@/products/components/ProductList";
import SearchProduct from "@/products/components/SearchProduct";
import Pagination from "@/products/components/Pagination";

type ProductListWidgetPropsType = {
  products: ProductType[]
  totalData: number
}

export const ProductListWidget = (props: ProductListWidgetPropsType) => {
  const { onToggleFavorite } = useProductContext()
  const machineFavorite = createMachineList(props)
  const [state, send] = useMachine(machineFavorite)
  const actionChangePage = (page: number) => {
    send({
      type: state.matches("changing-page-error") ? "RECHANGE_PAGE" : "CHANGE_PAGE",
      payload: { page }
    })
  }

  return (
    <>
      <SearchProduct
        inputValue={state.context.inputValue}
        onInput={(inputValue) => send({ type: "CHANGE_INPUT", payload: { inputValue } })}
      />
      {(state.matches("idle") || state.matches("loading")) && <p>Loading...</p>}
      {state.matches("changing-page") &&
        <>
          <p>Loading...</p>
          <Pagination
            currentPage={state.context.page}
            totalData={state.context.totalData}
            action={actionChangePage}
          />
        </>
      }
      {state.matches("error") &&
        <div>
          <p>{state.context.errorMessage}</p>
          <button onClick={() => send({ type: "REFETCH" })}>Refetch</button>
        </div>
      }
      {state.matches("changing-page-error") &&
        <div>
          <p>{state.context.errorMessage}</p>
          <Pagination
            currentPage={state.context.page}
            totalData={state.context.totalData}
            action={actionChangePage}
          />
        </div>
      }
      {state.matches("empty") && <p>List Product nya masih kosong maszeh</p>}
      {
        (state.matches("success")) &&
        <>
          <ProductList
            onToggleFavorite={(id) => onToggleFavorite(id)}
            products={state.context.products}
          />
          <Pagination
            currentPage={state.context.page}
            totalData={state.context.totalData}
            action={actionChangePage}
          />
        </>
      }
    </>
  )
}