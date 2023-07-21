const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// get all tags
router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        through: ProductTag,
      },
    ],
  })
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one tag by ID
router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new tag
router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(201).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update a tag's name by ID
router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    { tag_name: req.body.tag_name },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((tag) => {
      if (tag[0] === 0) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete one tag by its `id` value
router.delete("/:id", (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
