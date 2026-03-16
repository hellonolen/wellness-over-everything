// Shopify Storefront API client
// Store: 5ad7b8-76.myshopify.com

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '5ad7b8-76.myshopify.com'
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || ''
const SHOPIFY_API_VERSION = '2024-10'
const SHOPIFY_API_URL = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`

async function storefrontFetch(query, variables = {}) {
  const res = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  const { data, errors } = await res.json()
  if (errors) {
    console.error('Shopify API errors:', errors)
    throw new Error(errors[0]?.message || 'Shopify API error')
  }
  return data
}

// Fetch all products
export async function getProducts() {
  const data = await storefrontFetch(`
    query GetProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `)
  return data?.products?.edges?.map(e => e.node) || []
}

// Create a Shopify checkout with line items
export async function createCheckout(cartItems) {
  const lineItems = cartItems.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity || 1,
  })).filter(i => i.variantId)

  if (lineItems.length === 0) {
    throw new Error('No valid line items with variant IDs')
  }

  const data = await storefrontFetch(`
    mutation CreateCheckout($lineItems: [CheckoutLineItemInput!]!) {
      checkoutCreate(input: { lineItems: $lineItems }) {
        checkout {
          id
          webUrl
          totalPrice {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `, { lineItems })

  const errors = data?.checkoutCreate?.checkoutUserErrors
  if (errors?.length > 0) {
    throw new Error(errors[0].message)
  }

  return data?.checkoutCreate?.checkout
}

// Format Shopify price (e.g., "26.9" -> "$26.90")
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(parseFloat(amount))
}
