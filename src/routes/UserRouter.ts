import { Router } from "express";
import { Company } from "../models/Company";
import { User } from "../models/User";

const router = Router();

// Create a user / Add user to the company
router.post("/user/add", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    designation,
    dob,
    is_active,
    company_id,
  } = req.body;
  let user = await User.findOne({
    where: {
      email: email,
      company_id,
    },
  });
  if (user) {
    res.status(500).send({
      status: "failed",
      data: user,
      message: "User Already Exist.",
    });
    return;
  }
  user = await User.create({
    email,
    first_name,
    last_name,
    designation,
    dob,
    is_active,
    company_id,
  });

  res.status(200).send({
    status: "success",
    data: user,
    message: "User Added.",
  });
});

// Update a user
router.post("/user/update/:id", async (req, res) => {
  const { first_name, last_name, email, designation, dob, is_active } =
    req.body;
  let user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) {
    res.status(500).send({
      status: "failed",
      data: {},
      message: "Cannot Find user",
    });
    return;
  }
  user.update({
    email,
    first_name,
    last_name,
    designation,
    dob,
    is_active,
  });

  res.status(200).send({
    status: "success",
    data: user,
    message: "User Updated.",
  });
});

// Migrate a user
router.post("/user/migrate", async (req, res) => {
  const { id, company_id } = req.body;

  let user = await User.findOne({
    where: {
      id: id,
    },
  });

  let existingUser = await User.findOne({
    where: {
      email: user?.dataValues.email,
      company_id,
    },
  });

  if (existingUser) {
    res.status(500).send({
      status: "failed",
      data: {},
      message: "User with same email already exists.",
    });
    return;
  }
  await User.update(
    {
      company_id: company_id,
    },
    {
      where: {
        id,
      },
    }
  );

  res.status(200).send({
    status: "success",
    data: user,
    message: "User Migratd.",
  });
});

// List users
router.get("/users/:company_id", async (req, res) => {
  const { company_id } = req.params;
  const company = await Company.findOne({
    where: {
      id: company_id,
    },
  });
  if (company) {
    const users = await User.findAll({
      where: {
        company_id: company_id,
      },
      include: {
        model: Company,
        attributes: ["name"],
      },
    });
    res.status(200).send({
      status: "success",
      data: users,
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

// Get a specific user by ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (user) {
    res.status(200).send({
      status: "success",
      data: user,
      message: "",
    });
    return;
  }

  res.status(500).send({
    status: "failed",
    data: {},
    message: "Unable to find user",
  });
});

// Deactivate a user (sets to active=false)
router.post("/user/deactivate/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    res.status(500).send({
      status: "failed",
      data: {},
      message: "Cannot find user",
    });
    return;
  }

  user.update({
    is_active: false,
  });
  res.status(200).send({
    status: "success",
    data: {},
    message: "User deactivated successfully",
  });
});

// Delete a user / Remove user from the company
router.post("/user/delete/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    res.status(500).send({
      status: "failed",
      data: {},
      message: "Cannot find user",
    });
    return;
  }

  user.destroy();
  res.status(200).send({
    status: "success",
    data: {},
    message: "User deleted successfully",
  });
});

export { router as UserRouter };
