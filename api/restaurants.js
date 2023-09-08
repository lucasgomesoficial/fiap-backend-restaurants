const express = require("express");
const router = express.Router();

const supabase = require("../service/supabase");

/**
 * GET restaurant list.
 *
 * @return restaurant list | empty.
 */
router.get("/", async (req, res) => {
  try {
    const { data: restaurants } = await supabase
      .from("restaurants")
      .select("*");

    return res.json(restaurants);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

/**
 * POST restaurant list.
 *
 * @return created restaurant.
 */
router.post("/", async (req, res) => {
  try {
    const restaurants = req.body;

    await supabase.from("restaurants").insert(restaurants);

    return res.status(201).send("Created restaurants");
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

/**
 * DELETE restaurant row.
 *
 * @return delete row restaurant.
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await supabase
      .from("restaurants")
      .delete()
      .eq("id", id);

    return res.status(204).send("Deleted restaurant row");
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;
