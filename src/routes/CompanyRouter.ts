import { Router } from "express";
import { Company } from "../models/Company";

const router = Router();

router.post("/company/add", async (req, res) => {
  const { name, lat, long, address } = req.body;
  let company = await Company.findOne({
    where: {
      name: name,
    },
  });
  if (company) {
    res.status(500).send({
      status: "failed",
      data: company,
      message: "Company with same name already registerd.",
    });
    return;
  }

  company = await Company.create({
    name,
    lat,
    long,
    address,
  });

  res.status(200).send({
    status: "success",
    data: company,
    message: "Company Added.",
  });
});

router.post("/company/update/:id", async (req, res) => {
  const { name, lat, long, address } = req.body;
  let company = await Company.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!company) {
    res.status(500).send({
      status: "failed",
      data: {},
      message: "Cannot Find Compant",
    });
    return;
  }
  company.update({
    name,
    lat,
    long,
    address,
  });

  res.status(200).send({
    status: "success",
    data: company,
    message: "Company Updated.",
  });
});

router.get("/company/:id", async (req, res) => {
  const { id } = req.params;
  const company = await Company.findOne({
    where: {
      id,
    },
  });
  if (company) {
    res.status(200).send({
      status: "success",
      data: company,
      message: "",
    });
    return;
  }

  res.status(200).send({
    status: "failed",
    data: {},
    message: "Unable to find Company",
  });
});

router.post("/company/delete/:id", async (req, res) => {
  const { id } = req.params;
  const company = await Company.findOne({
    where: {
      id,
    },
  });
  if (!company) {
    res.status(500).send({
      status: "failed",
      data: {},
      message: "Cannot find company",
    });
    return;
  }

  company.destroy();
  res.status(200).send({
    status: "success",
    data: {},
    message: "Company deleted successfully",
  });
});

router.get("/companies", async (req, res) => {
  const companies = await Company.findAll();
  res.status(200).send({
    status: "success",
    data: companies,
    message: "",
  });
});

export { router as CompanyRouter };
