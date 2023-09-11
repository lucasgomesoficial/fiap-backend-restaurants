import express from "express";
import { supabase } from "../lib/supabase.js";
import vine, { errors } from "@vinejs/vine";

const router = express.Router();

// Request Body
// Route parameters
// Query parameters

// const arrays = [6, 7, 3 , 4]
// arrays[0] = 6
// arrays[1] = 7

/**
 * GET restaurant list.
 *
 * @return restaurant list | empty.
 */
router.get("/", async (req, res) => {
  try {
    const filterByAll = req.query; // { chave: "valor"}
    const query = Object.keys(filterByAll)[0]; // "chave"

    if (!query) {
      const { data: restaurants } = await supabase
        .from("restaurants")
        .select("*");

      return res.json(restaurants);
    }
    if (query === "id") {
      const { data: restaurants } = await supabase
        .from("restaurants")
        .select("*")
        .eq(query, filterByAll[query]);

      return res.json(restaurants);
    } else {
      const { data: restaurants } = await supabase
        .from("restaurants")
        .select("*")
        .lte(query, filterByAll[query]);

      return res.json(restaurants);
    }
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
    const bodySchema = vine.object({
      title: vine.string(),
      description: vine.string(),
      image: vine.string(),
      rating: vine.number().range([0, 5]).positive().decimal([0, 1]),
      address: vine.string(),
      cep: vine.string(),
      city: vine.string(),
      state: vine.string(),
    });

    const validator = vine.compile(bodySchema);
    const restaurants = await validator.validate(req.body);

    await supabase.from("restaurants").insert(restaurants);

    return res.status(201).send("Created restaurants");
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).send(`Error: ${error.messages[0].message}`);
    }
  }
});

/**
 * DELETE restaurant row.
 *
 * @return delete row restaurant.
 */
router.delete("/:id", async (req, res) => {
  try {
    const paramsSchema = vine.object({
      id: vine.string().uuid(),
    });

    const validator = vine.compile(paramsSchema);
    const { id } = await validator.validate(req.params);

    await supabase.from("restaurants").delete().eq("id", id);

    return res.status(204).send("Deleted restaurant row");
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).send(`Error: ${error.messages[0].message}`);
    }
  }
});

export default router;
