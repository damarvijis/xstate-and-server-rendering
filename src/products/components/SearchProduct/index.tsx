type SearchProductType = {
  onInput: (inputValue: string) => void
  inputValue: string
}

const SearchProduct = (props: SearchProductType) => (
  <input
    id="input"
    value={props.inputValue}
    placeholder="enter product name"
    onInput={e => {
      if (e.target instanceof HTMLInputElement)
        props.onInput(e.target.value)
    }}
  />
)


export default SearchProduct