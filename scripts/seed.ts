import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "koy1migf",   // hardcode project id
  dataset: "production",   // hardcode dataset
  apiVersion: "2024-08-30",
  token: "skjq6XayZiMg0WTrubBwj7ohSuv8vFVAAR2QdsAZOyG7dmMzVcMawzQdUh7VClymSJyC01N2lbdbrYVf8cI0RieWerMMaJwu4kZ6IClsavQzuagjPE7Y63by7KshpOQEhazcKJjlPogggfEtEDgGZ9yyAyBgHSbRuGbWKggbDqvoUBeA6nun", // hardcode token
  useCdn: false,
});

async function seedData() {
  const products = [
  {
    _type: "product",
    title: "Chocolate Truffle Cake With Honey Flavor",
    price: 2500,
    description: "Rich and moist chocolate truffle cake infused with a delicate touch of natural honey, perfect for celebrations or sweet cravings.",
  },
  {
    _type: "product",
    title: "Simple Coffee Recipes for Next Spring!",
    price: 500,
    description: "A beautifully curated collection of easy, refreshing coffee recipes perfect for spring mornings and warm afternoons.",
  },
  {
    _type: "product",
    title: "Chocolate Truffle Cake With Honey Flavor",
    price: 2500,
    description: "A delicious blend of dark chocolate and honey, smooth and indulgent with every bite.",
  },
  {
    _type: "product",
    title: "Bolognese Pasta",
    price: 1200,
    description: "Classic Italian-style pasta with rich and savory slow-cooked meat sauce, topped with parmesan and fresh herbs.",
  },
  {
    _type: "product",
    title: "Beef Burger",
    price: 850,
    description: "Juicy grilled beef patty served in a soft bun with lettuce, tomato, cheese, and signature sauces. A perfect hearty meal.",
  },
  {
    _type: "product",
    title: "Vegetarian or Vegan Tacos",
    price: 700,
    description: "Flavor-packed tacos filled with roasted chickpeas, fresh veggies, avocado slices, and a squeeze of lime — 100% plant-based delight.",
  },
  {
    _type: "product",
    title: "Fresh Lime",
    price: 100,
    description: "Fresh, juicy limes perfect for adding zest to your food or making refreshing drinks and marinades.",
  },
];

  for (const product of products) {
    const res = await client.create(product);
    console.log("✅ Created product:", res._id);
  }

  console.log("🎉 Seeding complete!");
}

seedData().catch(console.error);

