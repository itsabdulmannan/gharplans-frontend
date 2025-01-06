import electronics from "../../assets/electronics.jpeg"; 
import furniture from "../../assets/furniture.jpeg"; 

export const mockCategories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Furniture" },
];

export const mockProducts = [
  {
    id: "1",
    image: electronics,
    categoryId: { id: "1", name: "Electronics" },
    name: "Laptop",
    price: "999",
    status: "Active",
    color: "Black",
    description: "This is a laptop",
    shortDescription: "Laptop",
    additionalInformation: "This is a laptop",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    id: "2",
    image: furniture,
    categoryId: { id: "3", name: "Furniture" },
    name: "Sofa",
    price: "499",
    status: "Inactive",
    color: "Gray",
    description: "This is a comfortable sofa for your living room.",
    shortDescription: "Sofa",
    additionalInformation:
      "This sofa is made with high-quality fabric and offers excellent comfort.",
    options: ["Option A", "Option B", "Option C"],
  },
  {
    id: "3",
    image: electronics,
    categoryId: { id: "1", name: "Electronics" },
    name: "Smartphone",
    price: "699",
    status: "Active",
    color: "White",
    description: "This smartphone comes with the latest features and a high-quality camera.",
    shortDescription: "Smartphone",
    additionalInformation: "The smartphone features a 6.5-inch display, 128GB storage, and 4GB RAM.",
    options: ["Option X", "Option Y", "Option Z"],
  },
];
