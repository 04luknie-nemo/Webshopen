import { type Product } from "./types";

const savedProducts = localStorage.getItem("products");

export const initialProducts: Product[] = savedProducts ? 
  JSON.parse(savedProducts) : 
  [
  {
    id: 1,
    title: "Whey 100 Proteinpulver (Choklad)",
    description: "Högkvalitativt vassleprotein för optimal muskeluppbyggnad och återhämtning. 1kg med fantastisk chokladsmak.",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800",
    stock: 35
  },
  {
    id: 2,
    title: "Kreatin Monohydrat 500g",
    description: "100% rent mikroniserat kreatinmonohydrat som ökar styrka, explosivitet och muskelvolym vid högintensiv träning.",
    price: 199,
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800",
    stock: 50
  },
  {
    id: 3,
    title: "Pre-Workout (PWO) Sour Apple",
    description: "Kraftfull PWO laddad med koffein, beta-alanin och citrullin för extrem pump och maximalt fokus på gymmet.",
    price: 279,
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    stock: 20
  },
  {
    id: 4,
    title: "BCAA 4:1:1 Candy Cola",
    description: "Essentiella grenade aminosyror som motverkar muskelnedbrytning under träning. Uppfriskande colasmak.",
    price: 249,
    imageUrl: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800",
    stock: 28
  },
  {
    id: 5,
    title: "Lyftarbälte i Läder (Styrkelyft)",
    description: "Slitstarkt och stabilt bälte i äkta läder som ger optimalt buktryck och stöd vid tunga knäböj och marklyft.",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    stock: 12
  },
  {
    id: 6,
    title: "Dragremmar / Lifting Straps",
    description: "Klassiska dragremmar i slitstark bomull med neoprenvaddering runt handleden för bättre grepp vid tunga drag.",
    price: 129,
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800",
    stock: 65
  },
  {
    id: 7,
    title: "Shaker Flaska Matte Black 700ml",
    description: "Läckagesäker shaker med nätfilter för klumpfria proteindrinkar. BPA-fri och tål maskindisk.",
    price: 79,
    imageUrl: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800",
    stock: 100
  },
  {
    id: 8,
    title: "Justerbara Hantlar 20kg (Par)",
    description: "Platsbesparande hantelset i gjutjärn där du enkelt ändrar vikten mellan 2.5kg och 20kg per hantel.",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800",
    stock: 8
  },
  {
    id: 9,
    title: "Träningsgummiband Resistance Set",
    description: "5-pack gummiband med olika motståndsnivåer för hemmaträning, uppvärmning och rörlighet.",
    price: 189,
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800",
    stock: 45
  },
  {
    id: 10,
    title: "Proteinbars Crunchy Caramel (Låda 12st)",
    description: "Underbart goda proteinbars med 20g protein och utan tillsatt socker. Perfekt mellanmål efter träningen.",
    price: 289,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
    stock: 25
  }
];
