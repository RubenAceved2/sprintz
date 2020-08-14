const helper = require("../helper/helper");
const service = require("../service/service");

const createProject = async (project) => {
  const validateProjectObject = await helper.validateProjectOnCreation(project);
  if (validateProjectObject.status !== 200) return validateProjectObject;

  const validateIfCompanyExists = await service.validateIfCompanyExists(
    project.companyId
  );
  if (validateIfCompanyExists.error) return validateIfCompanyExists;

  if (
    validateIfCompanyExists === null ||
    validateIfCompanyExists === undefined
  ) {
    return { status: 500, error: "company does not exists" };
  }
  const validateContract = await helper.validateContract(
    project.contractStart,
    project.contractEnd
  );
  if (validateContract.status !== 200) return validateContract;

  const result = await service.createProject(project);
  return result;
};

const updateProject = async (id, project) => {
  if (id === null || id === undefined) {
    return { status: 500, error: "id needed as parameter" };
  }
  const validateIfProjectExists = await service.validateIfProjectExists(id);
  if (validateIfProjectExists === null || validateIfProjectExists === undefined)
    return { status: 500, error: "Project Id not found" };
  if (validateIfProjectExists.error) return validateIfProjectExists;

  const validateProjectObject = await helper.validateProjectOnCreation(project);
  if (validateProjectObject.status !== 200) return validateProjectObject;

  const validateIfCompanyExists = await service.validateIfCompanyExists(
    project.companyId
  );

  if (
    validateIfCompanyExists === null ||
    validateIfCompanyExists === undefined
  ) {
    return { status: 500, error: "company does not exists" };
  }
  if (validateIfCompanyExists.error) return validateIfCompanyExists;

  const validateContract = await helper.validateContract(
    project.contractStart,
    project.contractEnd
  );
  if (validateContract.status !== 200) return validateContract;

  const result = await service.updateProject(id, project);
  return result;
};

const createCompany = async (company) => {
  const validateCompanyObject = await helper.validateCompanyOnCreation(company);
  if (validateCompanyObject.status !== 200) return validateCompanyObject;

  const validateIfCompanyDuplicated = await service.validateIfCompanyDuplicated(
    company.document
  );

  if (validateIfCompanyDuplicated !== null) {
    return { status: 500, error: "company already created" };
  }

  const createCompanyObject = await helper.createCompanyObject(company);

  const result = await service.createCompany(createCompanyObject.company);

  return result;
};

const updateCompany = async (id, company) => {
  if (id === null || id === undefined) {
    return { status: 500, error: "id needed as parameter" };
  }

  const validateCompanyObject = await helper.validateCompanyOnCreation(company);
  if (validateCompanyObject.status !== 200) return validateCompanyObject;

  const validateIfCompanyExists = await service.validateIfCompanyExists(id);
  if (validateIfCompanyExists.error) return validateIfCompanyExists;

  if (
    validateIfCompanyExists === null ||
    validateIfCompanyExists === undefined
  ) {
    return { status: 500, error: "company Id not found" };
  }

  const result = await service.updateCompany(id, company);

  return result;
};

const listProjects = async () => {
  const result = service.listProjects();
  return result;
};

const listByCompany = async (companyId) => {
  if (companyId === null || companyId === undefined) {
    return { status: 500, error: "companyId needed as parameter" };
  }

  const validateIfCompanyExists = await service.validateIfCompanyExists(
    companyId
  );

  if (
    validateIfCompanyExists === null ||
    validateIfCompanyExists === undefined
  ) {
    return { status: 500, error: "company Id not found" };
  }

  if (validateIfCompanyExists.error) return validateIfCompanyExists;

  const result = service.listByCompany(companyId);
  return result;
};

const getById = async (id) => {
  if (id === null || id === undefined) {
    return { status: 500, error: "id needed as parameter" };
  }

  const validateIfProjectExists = await service.validateIfProjectExists(id);
  if (validateIfProjectExists.error) return validateIfProjectExists;
  if (validateIfProjectExists === null || validateIfProjectExists === undefined)
    return { status: 500, error: "Project Id not found" };

  const result = service.getById(id);
  return result;
};

const listCompanies = async () => {
  const result = service.listCompanies();
  return result;
};

module.exports = {
  createProject,
  createCompany,
  updateProject,
  updateCompany,
  listProjects,
  listByCompany,
  getById,
  listCompanies,
};
