const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags

router.get('/', (req, res) => {
  Tag.findAll({
      // associated Product data
    include: {
      model: Product
    }
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`

router.get('/:id', (req, res) => {

  Tag.findOne({
    where: {
      id: req.params.id
    },
    // Aassociated Product data
    include: {
      model: Product
    }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(400).json({ message: 'Not found'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.json(500).json(err);
  })
});

  // create a new tag

router.post('/', (req, res) => {
  Tag.create(req.body, {
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

 // update a tag's name by its `id` value

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(400).json({ message: 'Not found'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(400).json({ message: 'Not found'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;