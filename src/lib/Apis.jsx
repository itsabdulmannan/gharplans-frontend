import { Request } from "../Utils/useHttps";

export const Apis = {
  login: (data) => Request.post("/user/login", data),
  getUser: () =>
    Request.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  updatePassword: (data) => Request.post("/user/update-password", data),
  // Category Apis
  addCategory: (data) => Request.post("/category", data),
  getCategories: () => Request.get("/category"),
  updateCategoryStatus: (id, data) => Request.patch(`/category/status`, data),
  updateCategoryData: (id, data) =>
    Request.put(`/category/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getCategoryProducts: (id) => Request.get(`/product?categoryId=${id}`),
  // Prodcuts Api
  getProducts: () =>
    Request.get("/product", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  updateProductStatus: (data) => Request.patch(`/product/status`, data),
  getProductDetails: (id) => Request.get(`/product?id=${id}`),
  deletProduct: (id) => Request.delete(`/product/${id}`),
  addProduct: (data) =>
    Request.post("/product", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  showOnHomeScreen: (data) => Request.post("/product/change-order", data),
  getProductById: (id) => Request.get(`/product/`, { params: { id } }),
  // Users Apis
  getAllUsers: () => Request.get("/user/all"),
  searchUsers: (params) => Request.get(`/user/all`, { params: params }),
  updateUSerStatus: (data) => Request.patch(`/user/update`, data),
  // Orders Apis
  getOrders: (params) =>
    Request.get(
      "/orders",
      {
        params: params,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ),
  // Verify Payments
  getPayments: (queryParams) => {
    const queryString = new URLSearchParams(queryParams).toString();
    return Request.get(`/orders/payment-screenshots?${queryString}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        throw error;
      });
  },

  updatePaymentStatus: (id, body) =>
    Request.put(`/orders/${id}/verify-payment`, body),

  // Reviews
  acceptReviews: (body) => Request.put(`/reviews`, body),
  getReviews: (params) => Request.get("/reviews", { params }),
  // Bank Accounts
  getBankAccounts: () => Request.get("/bank/bankAccountDetails"),
  addBankAccount: (data) => Request.post("/bank/bankAccountDetails", data),
  delteBankAccount: (id) => Request.delete(`/bank/bankAccountDetails/${id}`),
  updateBankAccount: (id, data) =>
    Request.put(`/bank/bankAccountDetails/${id}`, data),
  // Get Utm
  getUtmLinks: () => Request.get("/utm/all"),
  createUtm: (data) => Request.post("/utm/create", data),
  // URL should be in this format: /utm/update?id=123&status=true
  updateUtmStatus: (id, status) =>
    Request.patch(`/utm/update?id=${id}&status=${status}`),
  // Cities
  getCities: () =>
    Request.get("/cities", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  createCity: (data) => Request.post("/cities", data),
  updateCityStatus: (id, data) =>
    Request.put(`/cities/${id}`, { name: data.name }),
  deleteCity: (id) => Request.delete(`/cities/${id}`),
  // Product Delivery Charges
  getProductsDeliveryCharges: () =>
    Request.get("/delivery-charges/product", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
  addProductDeliveryCharges: (data) =>
    Request.post("/delivery-charges/product", data),
  deleteProductDeliveryCharges: (id) =>
    Request.delete(`/delivery-charges/product/${id}`),
  updateProductDeliveryCharges: (id, data) =>
    Request.put(`/delivery-charges/product/${id}`, data),
  // Terms and Conditions
  getTermsAndConditions: () => Request.get("/tac"),
  addTermsAndConditions: (data) => Request.post("/tac", data),
  updateTermsAndConditions: (id, data) => Request.put(`/tac${id}`, data),
  // Privacy Policy
  getPrivacyPolicy: () => Request.get("/pap/privacy-policy"),
  addPrivacyPolicy: (data) => Request.post("/pap/privacy-policy", data),
  updatePrivacyPolicy: (id, data) =>
    Request.put(`/pap/privacy-policy/${id}`, data),
  // Faq
  getFaq: () => Request.get("/frequently/faqs"),
  addFaq: (data) => Request.post("/frequently/faqs", data),
  updateFaq: (id, data) => Request.put(`/frequently/faqs/${id}`, data),
  // Discounted Products
  getDiscountedProducts: (id) =>
    Request.get(`/product/dicounted-products/${id}`),
  addDiscountedProducts: (data) => {
    console.log(data);
    return Request.post("/product/addDiscountTiers", data);
  },
  deleteDiscountedProducts: (id, discountTierId) =>
    Request.delete(`/product/remove/${id}/${discountTierId}`),

  // Order Details
  getOrderByOrderId: (orderId) => Request.get(`/orders?orderId=${orderId}`),

  // Dashboard Stats
  getStats: () => Request.get("/user/statistics"),
  // Pdf
  generatePdf: (data) => Request.post("/quotation", data),
  getProductsForDeliveryCharges: () =>
    Request.get(`/product?offset=0&limit=1000`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  addStock: (payload) => Request.post("/product/update-stock", payload),
  addCarouselItems: (data) => Request.post("/product/change-order", data),
  getProducts: () => Request.get("/product?offset=0&limit=1000"),
  getCarouselItems: () => Request.get("/product/carousel-products"),
  updateCarouselItems: (data) => Request.put("product/update-carousel", data),
};
