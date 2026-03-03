const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create product (temporary for testing)
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/seed", async (req, res) => {
  try {
    const product = await Product.create({
      name: "iPhone 15",
      description: "Latest Apple smartphone",
      price: 999,
      category: "Mobiles",
      image: "https://via.placeholder.com/300",
      stock: 10,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;