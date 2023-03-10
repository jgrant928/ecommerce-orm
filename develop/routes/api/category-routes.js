const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// find all categories


router.get('/', (req, res) => {
  Category.findAll({})
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

 // find one category by its `id` value

 router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(400).json({ message: 'Not found'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {category_name: req.body.category_name},
    {
    where: {
      id: req.params.id
    }
  })
.then(categoryData => {
  if (!categoryData) {
    res.status(400).json({ message: 'Not found'});
    return;
  }
  res.json(categoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(400).json({ message: 'Not found'});
      return;
    }
    res.json(categoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})
});

module.exports = router;