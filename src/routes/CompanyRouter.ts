import { Router } from "express";
import NodeGeocoder from "node-geocoder";
import { Company } from "../models/Company";
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const router = Router();
async function getLatLng(address: string) {
  try {
    const res = await geocoder.geocode(address);
    return {
      latitude: res[0].latitude,
      longitude: res[0].longitude,
    };
  } catch (error) {
    console.error(error);
  }
}

// Create a company
router.post("/company/add", async (req, res) => {
  const { name, address } = req.body;
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

  let latLong = await getLatLng(address);

  company = await Company.create({
    name,
    lat: latLong?.latitude || 0,
    long: latLong?.longitude || 0,
    address,
  });

  res.status(200).send({
    status: "success",
    data: company,
    message: "Company Added.",
  });
});

// Update a company
router.post("/company/update/:id", async (req, res) => {
  const { name, address } = req.body;
  let company = await Company.findOne({
    where: {
      id: req.params.id,
    },
  });
  let latLong = await getLatLng(address);
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
    lat: latLong?.latitude || 0,
    long: latLong?.longitude || 0,
    address,
  });

  res.status(200).send({
    status: "success",
    data: company,
    message: "Company Updated.",
  });
});

// Get a specific company by ID
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

  res.status(500).send({
    status: "failed",
    data: {},
    message: "Unable to find Company",
  });
});

// Delete a company
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

// List companies
router.get("/companies", async (req, res) => {
  const companies = await Company.findAll();
  res.status(200).send({
    status: "success",
    data: companies,
    message: "",
  });
});

export { router as CompanyRouter };
