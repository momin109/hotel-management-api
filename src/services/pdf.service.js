const PDFDocument = require("pdfkit");
const fs = require("fs");

class PDFService {
  static async generateInvoice(invoice) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Build PDF content
      doc.fontSize(25).text("Invoice", { align: "center" });
      doc.moveDown();

      // Add invoice details
      doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
      doc.text(`Issue Date: ${invoice.issueDate.toDateString()}`);
      doc.text(`Due Date: ${invoice.dueDate.toDateString()}`);
      doc.moveDown();

      // Add customer details
      doc.text(`Customer: ${invoice.customerId.name}`);
      doc.text(`Booking ID: ${invoice.bookingId._id}`);
      doc.moveDown();

      // Add charges table
      this._addChargesTable(doc, invoice);

      doc.end();
    });
  }

  static _addChargesTable(doc, invoice) {
    const tableTop = doc.y;
    const col1 = 50;
    const col2 = 300;
    const col3 = 400;

    // Table header
    doc
      .font("Helvetica-Bold")
      .text("Description", col1, tableTop)
      .text("Amount", col2, tableTop)
      .text("Total", col3, tableTop);

    doc
      .moveTo(col1, tableTop + 20)
      .lineTo(col3 + 100, tableTop + 20)
      .stroke();

    // Table rows
    let y = tableTop + 30;

    // Room charges
    doc
      .font("Helvetica")
      .text("Room Charges", col1, y)
      .text(invoice.roomCharges.toFixed(2), col2, y)
      .text(invoice.roomCharges.toFixed(2), col3, y);
    y += 20;

    // Additional charges
    invoice.additionalCharges.forEach((charge) => {
      doc
        .text(charge.description, col1, y)
        .text(charge.amount.toFixed(2), col2, y)
        .text(charge.amount.toFixed(2), col3, y);
      y += 20;
    });

    // Discount
    if (invoice.discount > 0) {
      doc
        .text("Discount", col1, y)
        .text(`-${invoice.discount.toFixed(2)}`, col2, y)
        .text(`-${invoice.discount.toFixed(2)}`, col3, y);
      y += 20;
    }

    // Tax
    doc
      .text("Tax", col1, y)
      .text(invoice.tax.toFixed(2), col2, y)
      .text(invoice.tax.toFixed(2), col3, y);
    y += 20;

    // Service charge
    doc
      .text("Service Charge", col1, y)
      .text(invoice.serviceCharge.toFixed(2), col2, y)
      .text(invoice.serviceCharge.toFixed(2), col3, y);
    y += 20;

    // Total
    doc
      .font("Helvetica-Bold")
      .text("TOTAL", col1, y)
      .text(invoice.totalAmount.toFixed(2), col3, y);
  }
}

export default PDFService;
