import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useQuotation } from "./useHook";

function QuotationPage() {
  const { getProducts, generatePdf } = useQuotation();
  const [productList, setProductList] = useState([]);
  const [pdfFileLink, setPdfFileLink] = useState(null);
  const [quotationData, setQuotationData] = useState({
    quotation: [{ invoiceNo: "", date: "" }],
    billFrom: [{ billFromAddress: "", billFromPhone: "", billFromEmail: "" }],
    billTo: [{ billToName: "", billToPhone: "", billToAddress: "" }],
    products: [{ productId: "", quantity: "", color: "", weight: "" }],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts(setProductList);
  }, []);

  const handleChange = (section, field, value, index = null) => {
    setQuotationData((prev) => {
      if (index !== null) {
        const updatedProducts = [...prev.products];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        return { ...prev, products: updatedProducts };
      }
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
  };

  const handleAddProduct = () => {
    setQuotationData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { productId: "", quantity: "", color: "", weight: "" },
      ],
    }));
  };

  const handleRemoveProduct = (index) => {
    setQuotationData((prev) => {
      const updatedProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: updatedProducts };
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      await generatePdf(quotationData, setPdfFileLink);

      Swal.fire({
        title: "PDF Generated Successfully",
        text: "Click below to download the PDF",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "Download PDF",
      }).then((result) => {
        if (result.isConfirmed && pdfFileLink) {
          window.open(pdfFileLink, "_blank");
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to generate PDF",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-8xl p-6">
      <h2 className="text-3xl font-semibold text-center mb-5 text-gray-800">
        Generate Quotation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl mb-4 text-gray-700">Invoice</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Invoice No"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.quotation.invoiceNo}
              onChange={(e) =>
                handleChange("quotation", "invoiceNo", e.target.value)
              }
            />
            <input
              type="date"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.quotation.date}
              onChange={(e) =>
                handleChange("quotation", "date", e.target.value)
              }
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl mb-4 text-gray-700">
            Bill From
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Address"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.billFrom.billFromAddress}
              onChange={(e) =>
                handleChange("billFrom", "billFromAddress", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.billFrom.billFromPhone}
              onChange={(e) =>
                handleChange("billFrom", "billFromPhone", e.target.value)
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.billFrom.billFromEmail}
              onChange={(e) =>
                handleChange("billFrom", "billFromEmail", e.target.value)
              }
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl mb-4 text-gray-700">Bill To</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.billTo.billToName}
              onChange={(e) =>
                handleChange("billTo", "billToName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.billTo.billToPhone}
              onChange={(e) =>
                handleChange("billTo", "billToPhone", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
              value={quotationData.billTo.billToAddress}
              onChange={(e) =>
                handleChange("billTo", "billToAddress", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-lg flex flex-col gap-3">
        <h3 className="font-semibold text-xl text-gray-700">Products</h3>
        {quotationData.products.map((product, index) => (
          <div key={index} className="flex items-center gap-3">
            <select
              className="w-full p-3 border rounded-lg"
              value={product.productId}
              onChange={(e) =>
                handleChange("products", "productId", e.target.value, index)
              }
            >
              <option value="">Select Product</option>
              {productList.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full p-3 border rounded-lg"
              value={product.quantity}
              onChange={(e) =>
                handleChange("products", "quantity", e.target.value, index)
              }
            />
            <input
              type="text"
              placeholder="Color"
              className="w-full p-3 border rounded-lg"
              value={product.color}
              onChange={(e) =>
                handleChange("products", "color", e.target.value, index)
              }
            />
            <input
              type="text"
              placeholder="Weight"
              className="w-full p-3 border rounded-lg"
              value={product.weight}
              onChange={(e) =>
                handleChange("products", "weight", e.target.value, index)
              }
            />
            <button
              onClick={() => handleRemoveProduct(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          + Add New Product
        </button>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          onClick={() => setQuotationData({})}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          className={`bg-blue-600 text-white px-6 py-2 rounded-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Generating PDF..." : "Submit Quotation"}
        </button>
      </div>
    </div>
  );
}

export default QuotationPage;
