// InvoiceGenerator.js
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const generateCustomInvoicePDF = async (transactionId) => {
    console.log(transactionId)
    const res = await axios.get(`${BASE_URL}/api/Orders/Inovice${transactionId}`);
    const invoiceData = res.data;
    console.log("data", res.data);
    console.log("invoicedata", invoiceData);
  const doc = new jsPDF();

  // Company Header
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text("Fruitswallah", 14, 20);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text("www.fruitswallah.in", 14, 26);
  doc.text("support@fruitswallah.in", 14, 32);

  // Invoice Title
  doc.setFontSize(16);
  doc.setTextColor(50);
  doc.text("Invoice", 150, 20);

  // Invoice Info
  const orderDate = new Date(invoiceData.orderDate).toLocaleDateString();
  const infoTop = 40;
  doc.setFontSize(11);
  doc.text(`Invoice ID: ${invoiceData.transactionOrderID}`, 14, infoTop);
  doc.text(`Order Date: ${orderDate}`, 14, infoTop + 6);
  doc.text(`Payment: ${invoiceData.transactionType}`, 14, infoTop + 12);
  doc.text(`Status: ${invoiceData.transactionStatus}`, 14, infoTop + 18);

  // Customer Info
  const customerTop = infoTop + 30;
  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text("Bill To:", 14, customerTop);
  doc.setFontSize(11);
  doc.setTextColor(100);
  const fullAddress = `${invoiceData.houseNo}, ${invoiceData.locality}, ${invoiceData.address}, ${invoiceData.city}, ${invoiceData.state} - ${invoiceData.postalCode}`;
  doc.text(`${invoiceData.userName}`, 14, customerTop + 6);
  doc.text(fullAddress, 14, customerTop + 12);
  doc.text(`Phone: ${invoiceData.phoneNumber}`, 14, customerTop + 18);

  // Product Table
  const tableTop = customerTop + 30;
  const tableRows = invoiceData.products.map((item, index) => [
    index + 1,
    item.productName,
    item.productQty,
    `₹ ${item.productPrice}`,
    `₹ ${item.productQty * item.productPrice}`,
  ]);

  doc.autoTable({
    head: [["#", "Product", "Qty", "Price", "Total"]],
    body: tableRows,
    startY: tableTop,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: [255, 255, 255],
    },
  });

  
  const totalTop = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.text(`Subtotal: ₹ ${invoiceData.subTotal}`, 150, totalTop);
  doc.text(`Shipping: ₹ ${invoiceData.shippingCharge}`, 150, totalTop + 6);
  doc.setFontSize(12);
  doc.text(`Total: ₹ ${invoiceData.totalPrice}`, 150, totalTop + 14);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Thank you for your purchase!", 14, totalTop + 30);
  doc.text("This is a system-generated invoice.", 14, totalTop + 36);

  // Save
  doc.save(`Invoice_${invoiceData.transactionOrderID}.pdf`);
};
