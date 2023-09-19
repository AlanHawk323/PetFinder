const pg = require('pg');
const client = new pg.Client('postgres://localhost/petshop_db');
const express = require('express');
const app = express();

api.get('/api/pets', async(req, res, next) => {
    try{
        const SQL = `
        SELECT *
        FROM pets
        `;
        const response = await client.query(SQL);
        res.send(response.rows);
    }catch(ex){
        next(ex);
    }
});

const setup = async()=> {
    await client.connect();
    console.log('you are connected');
    const SQL = `
    DROP TABLE IF EXISTS pets;
    CREATE TABLE pets(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        is_favorite BOOLEAN
    );
    INSERT INTO pets (name) VALUES ('cat');
    INSERT INTO pets (name) VALUES ('dog');
    INSERT INTO pets (name) VALUES ('axolotl', true);
    INSERT INTO pets (name) VALUES ('horse');
    `;
    await client.query(SQL);
    console.log('tables created, data gathered')

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`${port} is listening`)
    })
};
setup();