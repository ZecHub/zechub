import Joi from 'joi';

export const validateCampaignCreation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(1000).optional(),
    target_amount: Joi.number().positive().optional(),
    category: Joi.string().valid('humanitarian', 'animals', 'environment', 'technology', 'education', 'health', 'other').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateDonation = (req, res, next) => {
  const schema = Joi.object({
    campaign_id: Joi.string().required(),
    amount: Joi.number().positive().optional(),
    memo: Joi.string().max(500).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
