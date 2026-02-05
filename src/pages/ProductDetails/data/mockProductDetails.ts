import type {
  ProductDetails,
  RelatedProduct,
} from "../types/productDetails.types";

export const mockProductDetails: ProductDetails = {
  id: 1,
  name: "Amazon Cloud Cam",
  slug: "amazon-cloud-cam",
  price: 70,
  rating: 5,
  reviewCount: 1,
  description:
    "More room to move. With 80GB or 160GB of storage and up to 40 hours of battery life, the new iPod classic lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go. Cover Flow. Browse through your music collection by flipping through album art. Select an album to turn it over and see the track list. Enhanced interface. Experience a whole new way to browse and view your music and video. Sleeker design. Beautiful, durable, and sleeker than ever, iPod classic now features an anodized aluminum and polish.",
  images: [
    "/assets/img/product/product5.jpg",
    "/assets/img/product/product4.jpg",
    "/assets/img/product/product6.jpg",
    "/assets/img/product/product8.jpg",
    "/assets/img/product/product2.jpg",
  ],
  colors: ["Choose an option", "Purple", "Violet", "Black", "Pink", "Orange"],
  sizes: ["Size", "S", "M", "L", "XL", "XXL"],
  specifications: [
    { key: "Compositions", value: "Polyester" },
    { key: "Styles", value: "Girly" },
    { key: "Properties", value: "Short Dress" },
  ],
  moreInfo:
    "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
  reviews: [
    {
      author: "Posthemes",
      rating: 5,
      date: "09/07/2018",
      comment: "That's OK!",
    },
  ],
};

export const relatedProducts: RelatedProduct[] = [
  {
    id: 21,
    name: "Marshall Portable Bluetooth",
    slug: "marshall-portable-bluetooth",
    price: 60,
    oldPrice: 86,
    image: "/assets/img/product/product21.jpg",
    secondaryImage: "/assets/img/product/product22.jpg",
    salePercent: 7,
  },
  {
    id: 27,
    name: "Koss KPH7 Portable",
    slug: "koss-kph7-portable",
    price: 60,
    image: "/assets/img/product/product27.jpg",
    secondaryImage: "/assets/img/product/product28.jpg",
  },
  {
    id: 6,
    name: "Beats Solo2 Solo 2",
    slug: "beats-solo2-solo-2",
    price: 60,
    image: "/assets/img/product/product6.jpg",
    secondaryImage: "/assets/img/product/product5.jpg",
  },
  {
    id: 7,
    name: "Beats EP Wired",
    slug: "beats-ep-wired",
    price: 60,
    oldPrice: 86,
    image: "/assets/img/product/product7.jpg",
    secondaryImage: "/assets/img/product/product8.jpg",
    salePercent: 7,
  },
];
