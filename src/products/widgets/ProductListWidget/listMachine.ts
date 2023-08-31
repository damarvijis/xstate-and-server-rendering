import { ProductType } from "@/products/internal/type"
import { createMachine, assign } from "xstate";
import { ListProduct } from "@/products/internal/http";
import { skipDataPagination, constData } from "@/products/internal";

type UseCreateMachinePropsType = {
  products: ProductType[]
  totalData: number
}

type ListContextType = {
  inputValue: string
  products: ProductType[]
  errorMessage: string
  page: number
  totalData: number
}

type ListActionType =
  { type: "FETCH" } |
  { type: "REFETCH" } |
  { type: "RESET_HOME" } |
  { type: "CHANGE_PAGE", payload: Pick<ListContextType, "page"> } |
  { type: "CHANGE_INPUT", payload: Pick<ListContextType, "inputValue"> } |
  { type: "RECHANGE_PAGE", payload: Pick<ListContextType, "page"> } |
  { type: "CHANGE_PAGE_SUCCESS", payload: Pick<ListContextType, "products"> } |
  { type: "CHANGE_PAGE_ERROR", payload: Pick<ListContextType, "errorMessage"> } |
  { type: "FETCH_SUCCESS", payload: Pick<ListContextType, "products" | "totalData"> } |
  { type: "FETCH_EMPTY" } |
  { type: "FETCH_ERROR", payload: Pick<ListContextType, "errorMessage"> }


export const createMachineList = (props: UseCreateMachinePropsType) => {
  let timeoutId: number | null | NodeJS.Timeout
  const initialState = props.products.length > 0 ? "success" : "idle"
  const productListMachine = createMachine<ListContextType, ListActionType>({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7CBXAxgFwBkBLWPAOiIgBswBiAMQFEAVAYQAkBtABgF1EU6WETxF0AOwEgAHogBMAVgAsZAIwBOBQGYNSrYqUAOJQHYANCACeiJXK1kTCk4dWG5cgGzdDh7loC+-hZomLiEJORU6ACGEETiUAwsHAD6AMoAqqysjGlpPPxIIMhCImKSRbIIHh4KDgrc3AqGzR7qWu0W1gjuhmRK2qpatSbc6i5OgcEY2PjEpGRRsfGJTGzsKYwASlsA8lsFUiXCohJSVTV1jo3Nre2dVjaKZOrcHoomeqpyJppTxTMwvNIjE4gkkutNgBZAAKzAAmociscymdKohLvUbi1DG0OloujYTB5+m85EpuEpxj9if8QrNwgslmDEhwAIIAOQA4owUgBJDkwjLMJGCE7lc42XxkOSqMZ6Dy-JRGJSEnpGfrabzE1SfX4mOR0wFzCJkHAAC2iCRWAFpkNEYLR2dzeTC2Tz0lkcnlRcVSqcKqALrUsU0cXiHt1dSYXoNPOM3Jo3EbQiaFharVBbfbHc6PW6Pds9gc+Ed-RL0T1lGpNDp1HoDMZzI8EHLVC9iQpmmNVB4Bj4UwzgWbLdaEnaHWAbWBUBhUE72JyPQKhSLS8jy2ig-JqxpBvX9Mom2r9DGtJSaloqepnO9B0DTRmx1AJzBp7P0POtow8673YxfRRANJSrFQ9zrBsj1MNVVAUOR+k7RVFT0HQPHvNNyFgXAcDgWAFyXXkV2FQDN0DGREBMLQYxaWC2i8OjtDVH4+lrVQNA8Kib3UNCggBVNGUw7DcPwl0UgLAD1zFVEyKqT4VCUVQKW48l63Udw1Rcfp1G08YTD0jwXEVdCBLIGc51ob81g4EjxS3ciEFvMhDGuAZ9LkN5m26Ki6gpd5ZS0fRXnowJePETA4COY0BLLWyZMQG0PDVBLjOHSgaBi6SQJaNR9BcA0lTg5U1Qpbh6mcb4DQq24UtNZkVgy4DKyMOpVMUGoWgURVDBPKkXjJWwryoiYavTUcs3HHMwAaittwQZqyA4xVhlxKkqLVesnPaOw3kpBRuO4EwRvIJ9xpfSb3znaa7KqWwYMozUdCGSjdr3I6yCwnAcNgeAN1ikD2j6Do3mMBRFIGd4YNcMg4NqLxuL7UGeOmfjhzAABbZA8G6KTGtmgGyCBgyBjBzq5GK4k+veRVuCGbi4IUN6zM-K64oQfHCZBkmIZbLRDHscZNHotwOIZkKgA */
    id: "productList",
    initial: initialState,
    predictableActionArguments: true,
    context: {
      inputValue: "",
      products: props.products,
      errorMessage: "",
      page: 1,
      totalData: props.totalData
    },
    states: {
      idle: {
        on: {
          FETCH: { target: "loading" },
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
          FETCH_EMPTY: { target: "empty" },
          CHANGE_INPUT: {
            target: "loading",
            actions: assign({
              page: 1,
              inputValue: (_, event) => event.payload.inputValue
            })
          }
        },
        invoke: {
          src: (ctx) => (callback) => {
            if (timeoutId != null) {
              clearTimeout(timeoutId)
            }

            timeoutId = setTimeout(() => {
              const skip = skipDataPagination(ctx.page)
              ListProduct({ limit: constData.limit, skip, search: ctx.inputValue })
                .then((res) => res.json())
                .then((data) => {
                  ctx.products = data.products
                  ctx.totalData = data.total
                  data.total === 0 ? callback("FETCH_EMPTY") : callback("FETCH_SUCCESS")
                })
                .catch((err) => {
                  ctx.errorMessage = err.message
                  callback("FETCH_ERROR")
                })
            }, 500)
          }
        }
      },
      "changing-page": {
        on: {
          CHANGE_PAGE_SUCCESS: { target: "success" },
          CHANGE_PAGE_ERROR: { target: "changing-page-error" },
        },
        invoke: {
          src: (ctx) => (callback) => {
            const skip = skipDataPagination(ctx.page)
            ListProduct({ limit: constData.limit, skip, search: ctx.inputValue })
              .then((res) => res.json())
              .then((data) => {
                callback("CHANGE_PAGE_SUCCESS")
                ctx.products = data.products
              })
              .catch((err) => {
                callback("CHANGE_PAGE_ERROR")
                ctx.errorMessage = err.message
              })
          }
        }
      },
      "changing-page-error": {
        on: {
          CHANGE_INPUT: {
            target: "loading",
            actions: assign({
              page: 1,
              inputValue: (_, event) => event.payload.inputValue
            })
          },
          RECHANGE_PAGE: {
            target: "changing-page",
            actions: assign({
              page: (_, event) => event.payload.page
            })
          }
        }
      },
      success: {
        on: {
          CHANGE_INPUT: {
            target: "loading",
            actions: assign({
              page: 1,
              inputValue: (_, event) => event.payload.inputValue
            })
          },
          CHANGE_PAGE: {
            target: "changing-page",
            actions: assign({
              page: (_, event) => event.payload.page
            })
          },
        },
      },
      empty: {
        on: {
          CHANGE_INPUT: {
            target: "loading",
            actions: assign({
              page: 1,
              inputValue: (_, event) => event.payload.inputValue
            })
          },
        }
      },
      error: {
        on: {
          REFETCH: { target: "loading" },
          CHANGE_INPUT: {
            target: "loading",
            actions: assign({
              page: 1,
              inputValue: (_, event) => event.payload.inputValue
            })
          },
        }
      }
    }
  })

  return productListMachine
}