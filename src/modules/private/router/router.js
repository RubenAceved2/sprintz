const router = require("express").Router();
const controller = require("../controller/controller");

// PROJECT
router.post("/project", async (req, res) => {
  const result = await controller.createProject(req.body);
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.project);
});

router.put("/project/:id", async (req, res) => {
  const result = await controller.updateProject(req.params.id, req.body);
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.project);
});

router.get("/project", async (req, res) => {
  const result = await controller.listProjects();
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.project);
});

router.get("/project/companyId/:companyId", async (req, res) => {
  const result = await controller.listByCompany(req.params.companyId);
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.project);
});

router.get("/project/:id", async (req, res) => {
  const result = await controller.getById(req.params.id);
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.project);
});

// COMPANY
router.post("/company", async (req, res) => {
  const result = await controller.createCompany(req.body);
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.company);
});

router.put("/company/:id", async (req, res) => {
  const result = await controller.updateCompany(req.params.id, req.body);
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.company);
});

router.get("/company", async (req, res) => {
  const result = await controller.listCompanies();
  if (result.status !== 200) {
    res.status(result.status);
    res.send({ error: result.error });
  } else res.send(result.company);
});

module.exports = router;
