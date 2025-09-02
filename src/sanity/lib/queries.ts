import { groq } from "next-sanity";

export const allProductsQuery = groq`
  *[_type == "product"]{
    _id,
    title,
    description,
    price,
    "imageUrl": image.asset->url
  }
`;
