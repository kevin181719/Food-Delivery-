import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food
const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      catagory: req.body.catagory,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("Add Food Error:", error);
    res.json({ success: false, message: "Error while adding food" });
  }
};

// List all foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("List Food Error:", error);
    res.json({ success: false, message: "Error while fetching food list" });
  }
};

// Remove food
const removeFood = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    if (!req.body.id) {
      return res.json({ success: false, message: "No ID provided" });
    }

    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // Delete image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.log("File deletion error:", err.message);
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log("Remove Food Error:", error);
    res.json({ success: false, message: "Error while removing food" });
  }
};

export { addFood, listFood, removeFood };
