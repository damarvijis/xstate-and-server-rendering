import { ProductType, AppContextType } from "@/products/internal/type"
import { createMachine, assign } from "xstate";
import { FindProductById } from "@/products/internal/http";

type FavoriteContextType = {
  products: ProductType[]
  deleteId: number | null
  errorMessage: string
}

type FavoriteActionType =
  { type: "FETCH" } |
  { type: "REFETCH" } |
  { type: "RESET_FAVORITE" } |
  { type: "DELETE_FAVORITE", payload: { id: number } } |
  { type: "DELETE_FAVORITE_SUCCESS" } |
  { type: "FETCH_SUCCESS", payload: { products: ProductType[] } } |
  { type: "FETCH_EMPTY" } |
  { type: "FETCH_ERROR", payload: { errorMessage: string } }


export const createMachineFavorite = (props: AppContextType) => {
  const { favoriteIds, onToggleFavorite } = props

  const productDetailMachine = createMachine<FavoriteContextType, FavoriteActionType>({
    id: "productDetail",
    initial: "idle",
    context: {
      products: [],
      deleteId: null,
      errorMessage: ""
    },
    states: {
      idle: {
        on: {
          FETCH: { target: "loading" }
        },
        invoke: {
          src: () => (callback) => {
            callback("FETCH")
          }
        }
      },
      loading: {
        on: {
          FETCH_SUCCESS: { target: "success" },
          FETCH_ERROR: { target: "error" },
          FETCH_EMPTY: { target: "empty" }
        },
        invoke: {
          src: (ctx) => (callback) => {
            const fetchPromises = favoriteIds.map(id => FindProductById({ id })
              .then(res => res.json())
              .catch((err) => {
                callback("FETCH_ERROR")
                ctx.errorMessage = err.message
              }
              )
            )
            Promise.all(fetchPromises)
              .then(res => {
                ctx.products = res
                res.length > 0 ? callback("FETCH_SUCCESS") : callback("FETCH_EMPTY")
              }).catch(err => {
                callback("FETCH_ERROR")
                ctx.errorMessage = err.message
              })
          }
        }
      },
      success: {
        on: {
          DELETE_FAVORITE: {
            target: "deleting",
            actions: assign({
              deleteId: (_, event) => event.payload.id
            })
          }
        },
      },
      deleting: {
        on: {
          DELETE_FAVORITE_SUCCESS: { target: "loading" }
        },
        invoke: {
          src: (ctx) => (callback) => {
            if (favoriteIds.length === ctx.products.length && ctx.deleteId) {
              onToggleFavorite(ctx.deleteId)
              callback({ type: "DELETE_FAVORITE_SUCCESS" })
            }
          }
        }
      },
      empty: {},
      error: {
        on: {
          REFETCH: {
            target: "loading"
          }
        }
      }
    }
  })

  return productDetailMachine
}