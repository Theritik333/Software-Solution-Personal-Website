const Contact = require('../models/Contact');
const { exportToExcel } = require('../utils/exportExcel');

// @POST /api/contact  (public - form submission)
const submitContact = async (req, res, next) => {
  try {
    const { name, email, countryCode, phoneNumber, businessName, serviceNeeded, message } = req.body;
    if (!name || !email || !phoneNumber || !message)
      return res.status(400).json({ success: false, message: 'Required fields missing' });

    const contact = await Contact.create({ name, email, countryCode, phoneNumber, businessName, serviceNeeded, message });
    res.status(201).json({ success: true, message: 'Message sent successfully', contact });
  } catch (err) { next(err); }
};

// @GET /api/admin/contacts  (protected)
const getAllContacts = async (req, res, next) => {
  try {
    const { isRead, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contact.countDocuments(filter);
    const unread = await Contact.countDocuments({ isRead: false });

    res.json({ success: true, total, unread, page: Number(page), contacts });
  } catch (err) { next(err); }
};

// @PUT /api/admin/contacts/:id/read  (protected)
const markAsRead = async (req, res, next) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true, message: 'Marked as read' });
  } catch (err) { next(err); }
};

// @DELETE /api/admin/contacts/:id  (protected)
const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) { next(err); }
};

// @GET /api/admin/contacts/export  (protected - bulk Excel download)
const exportContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    const data = contacts.map((c, i) => ({
      'S.No':           i + 1,
      'Name':           c.name,
      'Email':          c.email,
      'Country Code':   c.countryCode,
      'Phone':          c.phoneNumber,
      'Business Name':  c.businessName || '-',
      'Service Needed': c.serviceNeeded || '-',
      'Message':        c.message,
      'Read':           c.isRead ? 'Yes' : 'No',
      'Submitted On':   new Date(c.createdAt).toLocaleString('en-IN'),
    }));

    exportToExcel(res, data, 'Contacts', 'contact-queries');
  } catch (err) { next(err); }
};

module.exports = { submitContact, getAllContacts, markAsRead, deleteContact, exportContacts };
