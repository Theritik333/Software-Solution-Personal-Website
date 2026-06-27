const Project      = require('../models/Project');
const Partner      = require('../models/Partner');
const Service      = require('../models/Service');
const ClientReview = require('../models/ClientReview');
const Contact      = require('../models/Contact');
const ApplyNow     = require('../models/ApplyNow');
const Career       = require('../models/Career');
const Technology   = require('../models/Technology');

// @GET /api/admin/dashboard  (protected)
const getDashboardStats = async (req, res, next) => {
  try {
    const now       = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalProjects,
      totalPartners,
      totalServices,
      totalReviews,
      totalContacts,
      unreadContacts,
      totalApplications,
      unreadApplications,
      totalCareers,
      totalTechnologies,
      contactsThisMonth,
      contactsLastMonth,
      applicationsThisMonth,
      applicationsLastMonth,
    ] = await Promise.all([
      Project.countDocuments(),
      Partner.countDocuments(),
      Service.countDocuments(),
      ClientReview.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      ApplyNow.countDocuments(),
      ApplyNow.countDocuments({ isRead: false }),
      Career.countDocuments({ isActive: true }),
      Technology.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: thisMonth } }),
      Contact.countDocuments({ createdAt: { $gte: lastMonth, $lt: thisMonth } }),
      ApplyNow.countDocuments({ createdAt: { $gte: thisMonth } }),
      ApplyNow.countDocuments({ createdAt: { $gte: lastMonth, $lt: thisMonth } }),
    ]);

    // Last 6 months contact chart data
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const monthlyContacts = await Contact.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const monthlyApplications = await ApplyNow.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalPartners,
        totalServices,
        totalReviews,
        totalCareers,
        totalTechnologies,
        contacts: { total: totalContacts, unread: unreadContacts, thisMonth: contactsThisMonth, lastMonth: contactsLastMonth },
        applications: { total: totalApplications, unread: unreadApplications, thisMonth: applicationsThisMonth, lastMonth: applicationsLastMonth },
      },
      charts: {
        monthlyContacts,
        monthlyApplications,
      },
    });
  } catch (err) { next(err); }
};

module.exports = { getDashboardStats };
