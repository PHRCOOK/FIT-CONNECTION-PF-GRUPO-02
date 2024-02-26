const { Router } = require("express");
const upload = require("../services/multer");

const {
  getAllMembershipsHandler,
  getMembershipByIdHandler,
  createMembershipHandler,
  updateMembershipHandler,
  deleteMembershipHandler,
} = require("../handlers/membershipHandler");

const membershipsRouter = Router();

const { authorization } = require("../../utils/auth");

membershipsRouter.get("/", getAllMembershipsHandler);
membershipsRouter.get("/:id", getMembershipByIdHandler);
membershipsRouter.post(
  "/",
  authorization,
  upload.single("image_url"),
  createMembershipHandler
);
membershipsRouter.put(
  "/update/:id",
  authorization,
  upload.single("image_url"),
  updateMembershipHandler
);
membershipsRouter.delete("/delete/:id", authorization, deleteMembershipHandler);

module.exports = membershipsRouter;
