import { type SchemaTypeDefinition } from 'sanity'
import product from './../schemas/product'
import order from './../schemas/order'
import orderItem from "./../schemas/oderItem";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order,orderItem],
}
