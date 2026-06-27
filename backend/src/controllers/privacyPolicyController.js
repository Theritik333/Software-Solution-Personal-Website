const PrivacyPolicy = require('../models/PrivacyPolicy');

const getPrivacyPolicy = async (req, res, next) => {
  try {
    const policy = await PrivacyPolicy.findOne();
    res.json({ success: true, policy });
  } catch (err) { next(err); }
};

const upsertPrivacyPolicy = async (req, res, next) => {
  try {
    let policy = await PrivacyPolicy.findOne();
    if (policy) {
      Object.assign(policy, req.body, { lastUpdated: new Date() });
      await policy.save();
    } else {
      policy = await PrivacyPolicy.create(req.body);
    }
    res.json({ success: true, message: 'Privacy policy updated', policy });
  } catch (err) { next(err); }
};

module.exports = {
  getPrivacyPolicy,
  upsertPrivacyPolicy,
};
