import { Router } from "express";
import { Company } from "../models/Company";
import { User } from "../models/User";

const router = Router();

router.post("/user/add", async (req, res) => {
  const { first_name, last_name, email, designation, dob, is_active } =
    req.body;
  let user = await User.findOne({
    where: {
      email: email,
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
  });

  res.status(200).send({
    status: "success",
    data: user,
    message: "User Added.",
  });
});

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

router.post("/user/migrate", async (req, res) => {
  const { id, company_id } = req.body;
  let user = await User.findOne({
    where: {
      id: id,
    },
  });
  const company = await Company.findOne({
    where: {
      id: company_id,
    },
  });
  if (!user) {
    res.status(500).send({
      status: "failed",
      data: {},
      message: "Unable to migrate user.",
    });
    return;
  }
  await User.update(
    {
      company_id: company?.id,
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
    });
    res.status(200).send({
      status: "success",
      data: users,
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

  res.status(200).send({
    status: "failed",
    data: {},
    message: "Unable to find user",
  });
});

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
