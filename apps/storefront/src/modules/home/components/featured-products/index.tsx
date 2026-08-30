import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import { Text } from "@modules/common/components/ui"
import ProductPreview from "@modules/products/components/product-preview"

export default async function FeaturedProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 12,
      fields: "*variants.calculated_price",
    },
  })

  if (!products.length) {
    return null
  }

  return (
    <section className="content-container py-16 small:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <Text className="txt-xlarge">Shop our gear</Text>
          <p className="mt-2 text-base-regular text-ui-fg-subtle">
            Pickleball essentials ready for your next match.
          </p>
        </div>
        <InteractiveLink href="/store">View all</InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-16 small:grid-cols-3 small:gap-y-24">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </section>
  )
}
