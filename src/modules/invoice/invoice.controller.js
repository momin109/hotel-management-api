import Invoice from "./invoice.model.js";
import {
  createInvoiceForBooking,
  getInvoiceById,
  getInvoicesByCustomer,
  getAllInvoices,
} from "./invoice.service.js";

//create invoice for a booking

export const createInvoiceController = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const invoice = await createInvoiceForBooking(bookingId);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await getInvoiceById(id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getCustomerInvoicesController = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const invoices = await getInvoicesByCustomer(customerId);
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

export const getAllInvoicesController = async (req, res, next) => {
  try {
    const { status, from, to } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }
    const invoices = await getAllInvoices(filter);
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

// export const downloadInvoicePdfController  = async (req,res ,next) => {
// try {
//     const {id} = req.params;
//     const pdfBuffer = await generateInvoicePdf(id);

//      res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=invoice_${id}.pdf`);
//     res.send(pdfBuffer);
// } catch (error) {
//      next(error);
// }
// }
