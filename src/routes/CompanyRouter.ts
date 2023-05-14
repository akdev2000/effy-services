import { Router } from "express";
import NodeGeocoder from "node-geocoder";
import { Company } from "../models/Company";
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const router = Router();

async function getAddress(latitude: number, longitude: number) {
  try {
    const res = await geocoder.reverse({ lat: latitude, lon: longitude });
    return res[0].formattedAddress;
  } catch (error) {
    console.error(error);
  }
  return;
}

router.post("/company/add", async (req, res) => {
  const { name, lat, long } = req.body;
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

  let newAddress = await getAddress(lat, long);

  company = await Company.create({
    name,
    lat,
    long,
    address: newAddress ? newAddress : "Invalid Lat and Long",
  });

  res.status(200).send({
    status: "success",
    data: company,
    message: "Company Added.",
  });
});

router.post("/company/update/:id", async (req, res) => {
  const { name, lat, long } = req.body;
  let company = await Company.findOne({
    where: {
      id: req.params.id,
    },
  });
  let newAddress = await getAddress(lat, long);
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
    address: newAddress ? newAddress : undefined,
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
