import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Cambrian Pickleball Store",
  description: "Shop pickleball gear and essentials at Cambrian Pickleball Store.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <FeaturedProducts region={region} />
    </>
  )
}
