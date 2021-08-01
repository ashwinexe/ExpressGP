const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, genre:'action'},
    {id: 2, genre:'horror'},
    {id: 3, genre:'comedy'},
    {id: 4, genre:'shreya'},

];

app.get('/genre', (req, res) => {
    res.send(genres);
});

app.post('/genre', (req, res) => {
    
    const { error } = validateGenre(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    const new_genre = {
        id: genres[genres.length -1 ].id + 1,
        genre: req.body.genre
    };

    genres.push(new_genre);
    res.send(new_genre);
});

app.put('/genre/:genre', (req, res) => {
    const find_genre = genres.find(x => x.genre === req.params.genre);

    if(!find_genre)
        return res.status(404).send('Genre not found!');

        find_genre.genre = req.body.genre
        res.send(genres);
});

app.delete('/genre/:genre', (req, res) => {
    const find_genre = genres.find( x => x.genre === req.params.genre);

    if(!find_genre)
        return res.status(404).send('Genre not found!');
    
    const index = genres.indexOf(find_genre);
    genres.splice(index, 1);
    // res.send(find_genre + ' deleted!')
    res.send(find_genre)

});

function validateGenre(genres) {
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });

    return schema.validate(genres);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));