import { GetStaticProps } from "next"
import { TestPropsType } from "@/test/type"
import { Isr } from "@/test/screens"

export const getStaticProps: GetStaticProps<TestPropsType> = async () => {
  return {
    props: {
      name: "damar",
      date: new Date().toString()
    },
    revalidate: 10
  }
}

export default Isr
