import electronics from "../../assets/electronics.jpeg";
import furniture from "../../assets/furniture.jpeg";

export const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://picsum.photos/200/300",
    status: "active",
  },
  {
    id: 2,
    name: "Furniture",
    image: "https://picsum.photos/200/300?grayscale",
    status: "inactive",
  },
  {
    id: 3,
    name: "Books",
    image: "https://picsum.photos/seed/picsum/200/300",
    status: "active",
  },
  {
    id: 4,
    name: "Fashion",
    image: "https://picsum.photos/200/300/?blur",
    status: "active",
  },
  {
    id: 5,
    name: "Toys",
    image: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
    status: "inactive",
  },
  {
    id: 6,
    name: "Beauty",
    image: "https://picsum.photos/200/300?grayscale",
    status: "active",
  },
  {
    id: 7,
    name: "Sports",
    image: "https://picsum.photos/200/300?grayscale",
    status: "inactive",
  },
  {
    id: 8,
    name: "Home Appliances",
    image: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
    status: "active",
  },
  {
    id: 9,
    name: "Garden",
    image: "https://picsum.photos/200/300?grayscale",
    status: "inactive",
  },
  {
    id: 10,
    name: "Automotive",
    image: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81",
    status: "active",
  },
];
export const mockProducts = [
  {
    id: "1",
    image: "https://picsum.photos/seed/picsum/200/300",
    categoryId: { id: "2", name: "Sanitary" },
    name: "Luxury Rainfall Showerhead",
    price: "199",
    status: "Active",
    color: "Chrome",
    description:
      "This luxury rainfall showerhead provides a spa-like experience with its invigorating water flow and high-quality design. Constructed from durable stainless steel with a chrome finish, it resists corrosion and retains its shine even after years of use. The showerhead features a wide 8-inch diameter with a 360-degree swivel, allowing for customizable angles to suit your showering preferences. The rain-style flow mimics a natural rainfall, offering a soothing, gentle cascade of water. It's equipped with anti-clog nozzles that prevent buildup of mineral deposits, ensuring a consistently powerful flow. The high-pressure technology ensures a steady water stream, even in homes with lower water pressure, offering a refreshing shower every time. Compatible with most standard shower arms, the installation process is simple and quick. This premium showerhead also helps conserve water with its eco-friendly design, offering a consistent flow without excessive water waste. Perfect for anyone seeking a luxurious and sustainable showering experience.",
    shortDescription:
      "Premium 8-inch luxury rainfall showerhead with high-pressure technology, anti-clog nozzles, and eco-friendly design.",
    additionalInformation:
      "Made from corrosion-resistant stainless steel with a sleek chrome finish, this showerhead provides exceptional durability and aesthetic appeal. The showerhead is designed with easy-to-clean anti-clog nozzles, ensuring long-lasting performance even in areas with hard water. Its 360-degree swivel functionality allows you to adjust the angle of the showerhead to your preferred position. The high-pressure system works well in both low-pressure and high-pressure water systems, making it versatile for all homes. The water-saving design uses up to 30% less water compared to traditional showerheads, making it both environmentally friendly and cost-effective. It is backed by a 2-year warranty, and the package includes all necessary installation parts, making it easy to set up. The showerhead is ideal for anyone looking to upgrade their bathroom experience with a luxurious, eco-friendly, and efficient product.",
    options: ["Chrome", "Matte Black", "Brushed Nickel"],
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
    additionalInformation:
      "The smartphone features a 6.5-inch display, 128GB storage, and 4GB RAM.",
    options: ["Option X", "Option Y", "Option Z"],
  },
  {
    id: "4",
    image: furniture,
    categoryId: { id: "3", name: "Furniture" },
    name: "Dining Table",
    price: "299",
    status: "Active",
    color: "Brown",
    description: "A modern dining table with seating for six.",
    shortDescription: "Dining Table",
    additionalInformation: "Made from premium wood, perfect for family meals.",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    id: "5",
    image: electronics,
    categoryId: { id: "1", name: "Electronics" },
    name: "Headphones",
    price: "199",
    status: "Active",
    color: "Black",
    description: "Noise-canceling over-ear headphones with great sound quality.",
    shortDescription: "Headphones",
    additionalInformation:
      "Features include Bluetooth connectivity and 30-hour battery life.",
    options: ["Option A", "Option B"],
  },
  {
    id: "6",
    image: furniture,
    categoryId: { id: "3", name: "Furniture" },
    name: "Bookshelf",
    price: "149",
    status: "Inactive",
    color: "White",
    description: "A spacious bookshelf to organize your books and decor items.",
    shortDescription: "Bookshelf",
    additionalInformation: "Made of engineered wood, modern and sleek design.",
    options: ["Option 1"],
  },
  {
    id: "7",
    image: electronics,
    categoryId: { id: "1", name: "Electronics" },
    name: "Smartwatch",
    price: "249",
    status: "Active",
    color: "Gray",
    description: "Track your fitness goals with this smartwatch.",
    shortDescription: "Smartwatch",
    additionalInformation: "Features heart rate monitoring and GPS tracking.",
    options: ["Option X"],
  },
  {
    id: "8",
    image: furniture,
    categoryId: { id: "3", name: "Furniture" },
    name: "Wardrobe",
    price: "599",
    status: "Active",
    color: "Dark Brown",
    description: "A spacious wardrobe with multiple compartments.",
    shortDescription: "Wardrobe",
    additionalInformation: "Made of solid wood, includes a mirror on the door.",
    options: ["Option A", "Option B", "Option C"],
  },
  {
    id: "9",
    image: electronics,
    categoryId: { id: "1", name: "Electronics" },
    name: "Camera",
    price: "799",
    status: "Inactive",
    color: "Black",
    description: "High-resolution DSLR camera for photography enthusiasts.",
    shortDescription: "Camera",
    additionalInformation:
      "Includes 24.2 MP sensor, 4K video recording, and Wi-Fi connectivity.",
    options: ["Option 1", "Option 2"],
  },
  {
    id: "10",
    image: furniture,
    categoryId: { id: "3", name: "Furniture" },
    name: "Recliner",
    price: "399",
    status: "Active",
    color: "Beige",
    description: "Comfortable recliner chair with adjustable positions.",
    shortDescription: "Recliner",
    additionalInformation: "Perfect for relaxing and watching TV.",
    options: ["Option A", "Option B"],
  },
];
export const mockedInvoiceProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "High-quality item",
    quantity: 2,
    price: 450.0,
    discount: 10,
    rate: 0.9,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Premium-grade product",
    quantity: 3,
    price: 650.0,
    discount: 15,
    rate: 0.85,
  },
];
export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://randomuser.me/api/portraits/men/79.jpg",
    address: "123 Main St, City, Country",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image: "https://randomuser.me/api/portraits/men/79.jpg",
    address: "456 Elm St, Town, Country",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    image: "https://randomuser.me/api/portraits/men/79.jpg",
    address: "789 Oak St, Village, Country",
    status: "Active",
  },
];
export const mockBankAccountData = [
  {
    bankName: "Bank of America",
    accountHolderName: "John Doe",
    accountNumber: "1234567890",
    iban: "US1234567890ABCD",
    branchCode: "BOA001",
    status: "Active",
  },
  {
    bankName: "Chase Bank",
    accountHolderName: "Jane Smith",
    accountNumber: "9876543210",
    iban: "US9876543210EFGH",
    branchCode: "CHS002",
    status: "Inactive",
  },
  {
    bankName: "Wells Fargo",
    accountHolderName: "Alice Johnson",
    accountNumber: "1122334455",
    iban: "US1122334455IJKL",
    branchCode: "WFC003",
    status: "Active",
  },
];
export const verifyPayments = [
  {
    id: "ORD001",
    srNo: 1,
    customerName: "John Doe",
    image: "/path/to/image1.jpg",
  },
  {
    id: "ORD002",
    srNo: 2,
    customerName: "Jane Smith",
    image: "/path/to/image2.jpg",
  },
  {
    id: "ORD003",
    srNo: 3,
    customerName: "Tom Brown",
    image: "/path/to/image3.jpg",
  },
]
export const utmLink = [
  {
    id: 1,
    baseUrl: "https://example.com",
    source: "Instagram",
    medium: "Influencer",
    campaign: "Winter Sale",
  },
  {
    id: 2,
    baseUrl: "https://shop.example.com",
    source: "Facebook",
    medium: "Paid Ads",
    campaign: "Black Friday",
  },
  {
    id: 3,
    baseUrl: "https://blog.example.com",
    source: "Twitter",
    medium: "Organic",
    campaign: "Tech Launch",
  },
  {
    id: 4,
    baseUrl: "https://store.example.com",
    source: "LinkedIn",
    medium: "Email",
    campaign: "Summer Collection",
  },
  {
    id: 5,
    baseUrl: "https://promo.example.com",
    source: "YouTube",
    medium: "Influencer",
    campaign: "Holiday Discount",
  },
];
