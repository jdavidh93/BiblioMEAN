import express from "express";
import customer from "../controllers/customer.js";
const router = express.Router()

router.post("/registerCustomer", customer.registerCustomer);
router.get("/listCustomer", customer.listCustomer);
router.put("/updateCustomer", customer.updateCustomer);
router.delete("/deleteCustomer/:_id", customer.deleteCustomer);


export default router