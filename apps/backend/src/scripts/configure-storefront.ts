import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

// Connect the local storefront to the publishable key created by the seed.
export default async function configureStorefront({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data: keys } = await query.graph({
    entity: "api_key",
    fields: ["token"],
    filters: { type: "publishable", title: "Default Publishable API Key" },
  })

  if (keys.length !== 1 || !keys[0].token) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Expected one default publishable key. Run database migrations first."
    )
  }

  const envPath = resolve(process.cwd(), "../storefront/.env.local")
  const env = readFileSync(envPath, "utf8")
  const setting = `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${keys[0].token}`
  const updated = /^NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*$/m.test(env)
    ? env.replace(/^NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*$/m, setting)
    : `${env.trimEnd()}\n${setting}\n`
  writeFileSync(envPath, updated, { mode: 0o600 })
  container.resolve(ContainerRegistrationKeys.LOGGER).info("Local storefront connected.")
}
