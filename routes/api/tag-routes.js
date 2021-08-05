const router = require('express').Router();
const {Tag, Product, ProductTag} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    Tag.findAll({include: Product})
        .then((tags) => {
            // be sure to include its associated Products
            res.json(tags);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findAll({
        where: {
            id: req.params.id
        },
        include: Product
    }).then((tag) => {
        res.json(tag);
    })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    // create a new tag
    Tag.create({
            tag_name: req.body.tag_name
        }
    )
        .then((tag) => {
            res.json(tag);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update({
        tag_name: req.body.tag_name
    }, {
        where: {id: req.params.id}
    }).then((tag) => {
        res.json(tag);

    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
        where: {id: req.params.id}
    }).then((result) => {
        res.json({result:true});
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;
