import { productsSlug } from '@/utils/utils'
import { getAllProducts } from '/lib/api'
import BasketClient from './Basket'

export default async function BasketPage() {
  const products = await getAllProducts()
  const productsWithSlug = productsSlug(products)

  return <BasketClient products={productsWithSlug} />
};