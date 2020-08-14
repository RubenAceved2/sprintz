const Joi = require("joi");

const projectSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  companyId: Joi.string().required(),
  budget: Joi.number().required(),
  contractStart: Joi.number().required(),
  contractEnd: Joi.number().required(),
  status: Joi.number().required(),
  teams: Joi.string(),
  users: Joi.string(),
});

const companySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  document: Joi.string().min(3).max(30).required(),
});

const validateProjectOnCreation = (project) => {
  const validation = projectSchema.validate(project);

  if (!validation.error) {
    return {
      status: 200,
      project,
    };
  } else return { status: 500, error: validation.error.details[0].message };
};

const validateCompanyOnCreation = (company) => {
  const validation = companySchema.validate(company);

  if (!validation.error) {
    return {
      status: 200,
      company,
    };
  } else return { status: 500, error: validation.error.details[0].message };
};

const createCompanyObject = (company) => {
  company.status = 0;
  return { status: 200, company };
};

const validateContract = (contractStart, contractEnd) => {
  if (contractStart >= contractEnd) {
    return {
      status: 500,
      error: "contractEnd must be higher than contractStart",
    };
  } else return { status: 200 };
};

module.exports = {
  validateProjectOnCreation,
  validateCompanyOnCreation,
  createCompanyObject,
  validateContract,
};
