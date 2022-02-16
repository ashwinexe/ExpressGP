const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, restaurant:'Indian'},
    {id: 2, restaurant:'Chinese'},
    {id: 3, restaurant:'Thai'},
    {id: 4, restaurant:'Western'},

];

app.get('/restaurant', (req, res) => {
    res.send(genres);
});

app.post('/restaurant', (req, res) => {
    
    const { error } = validateGenre(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    const new_genre = {
        id: genres[genres.length -1 ].id + 1,
        genre: req.body.genre
    };

    genres.push(new_genre);
    res.send(new_genre);
});

app.put('/restaurant/:restaurant', (req, res) => {
    const find_genre = genres.find(x => x.restaurant === req.params.genre);

    if(!find_genre)
        return res.status(404).send('Genre not found!');

        find_genre.restaurant = req.body.genre
        res.send(genres);
});

app.delete('/restaurant/:restaurant', (req, res) => {
    const find_genre = genres.find( x => x.restaurant === req.params.genre);

    if(!find_genre)
        return res.status(404).send('Restaurant not found!');
    
    const index = genres.indexOf(find_genre);
    genres.splice(index, 1);
    // res.send(find_genre + ' deleted!')
    res.send(find_genre)

});

function validateGenre(restaurant) {
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });

    return schema.validate(restaurant);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));