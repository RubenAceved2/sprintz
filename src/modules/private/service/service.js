const connection = require("../../../../config/connection");
const ObjectID = require("mongodb").ObjectID;

const createProject = async (projectObject) => {
  const client = await connection();
  await client.connect();

  try {
    const project = await client
      .db("sprintz")
      .collection("projects")
      .insertOne(projectObject);
    return {
      status: 200,
      project: project.ops,
    };
  } catch (err) {
    throw err;
  } finally {
    if (projectObject.status === 1) {
      await client
        .db("sprintz")
        .collection("company")
        .updateOne(
          {
            _id: ObjectID(projectObject.companyId),
          },
          {
            $set: { status: 1 },
          }
        );
    }
    client.close();
  }
};

const updateProject = async (id, projectObject) => {
  const client = await connection();
  await client.connect();

  try {
    const project = await client
      .db("sprintz")
      .collection("projects")
      .updateOne(
        {
          _id: ObjectID(id),
        },
        {
          $set: projectObject,
        }
      );
  } catch (err) {
    throw err;
  } finally {
    const getProj = await client
      .db("sprintz")
      .collection("projects")
      .findOne({
        _id: ObjectID(id),
      });
    client.close();
    return {
      status: 200,
      project: getProj,
    };
  }
};

const createCompany = async (companyObject) => {
  const client = await connection();
  await client.connect();

  try {
    const company = await client
      .db("sprintz")
      .collection("company")
      .insertOne(companyObject);
    return {
      status: 200,
      company: company.ops,
    };
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

const validateIfCompanyExists = async (id) => {
  const client = await connection();
  await client.connect();

  try {
    const company = await client
      .db("sprintz")
      .collection("company")
      .findOne({
        _id: ObjectID(id),
      });
    return company;
  } catch (err) {
    return { status: 500, error: "incorrect ObjectID format" };
  } finally {
    client.close();
  }
};

const validateIfCompanyDuplicated = async (document) => {
  const client = await connection();
  await client.connect();

  try {
    const company = await client.db("sprintz").collection("company").findOne({
      document: document,
    });
    return company;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

const validateIfProjectExists = async (id) => {
  const client = await connection();
  await client.connect();

  try {
    const project = await client
      .db("sprintz")
      .collection("projects")
      .findOne(ObjectID(id));
    return project;
  } catch (err) {
    return { status: 500, error: "incorrect ObjectID format" };
  } finally {
    client.close();
  }
};

const updateCompany = async (id, companyObject) => {
  const client = await connection();
  await client.connect();

  try {
    await client
      .db("sprintz")
      .collection("company")
      .updateOne(
        {
          _id: ObjectID(id),
        },
        {
          $set: companyObject,
        }
      );
  } catch (err) {
    throw err;
  } finally {
    const getComp = await client
      .db("sprintz")
      .collection("company")
      .findOne({
        _id: ObjectID(id),
      });
    client.close();
    return {
      status: 200,
      company: getComp,
    };
  }
};

const listProjects = async () => {
  const client = await connection();
  await client.connect();

  try {
    const project = await client
      .db("sprintz")
      .collection("projects")
      .find()
      .toArray();
    return { status: 200, project: project };
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

const listByCompany = async (companyId) => {
  const client = await connection();
  await client.connect();

  try {
    const project = await client
      .db("sprintz")
      .collection("projects")
      .find({ companyId: companyId })
      .toArray();
    return { status: 200, project: project };
  } catch (err) {
    return { status: 500, error: "incorrect ObjectID format" };
  } finally {
    client.close();
  }
};

const getById = async (id) => {
  const client = await connection();
  await client.connect();

  try {
    const project = await client
      .db("sprintz")
      .collection("projects")
      .findOne({
        _id: ObjectID(id),
      });
    return { status: 200, project: project };
  } catch (err) {
    return { status: 500, error: "incorrect ObjectID format" };
  } finally {
    client.close();
  }
};

const listCompanies = async () => {
  const client = await connection();
  await client.connect();

  try {
    const company = await client
      .db("sprintz")
      .collection("company")
      .find()
      .toArray();
    return { status: 200, company: company };
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
};

module.exports = {
  createCompany,
  validateIfCompanyExists,
  createProject,
  validateIfCompanyDuplicated,
  updateProject,
  validateIfProjectExists,
  updateCompany,
  listProjects,
  listByCompany,
  getById,
  listCompanies,
};
