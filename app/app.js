const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);


const usersGetToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
};

const verifyToken = (req, res, next) => {
    try {
        usersGetToken(req);
        next();
    } catch(e) {
        res.send({ error: 'Invalid token' });
    }
};

app.get('/exhibitors', verifyToken, (req, res) => {
    const user = usersGetToken(req);

    connection.execute('SELECT * FROM exhibitors WHERE userId=?', 
    [user.id], (err, result) => {
        res.send(result);
    });
});

app.post('/exhibitors', verifyToken, (req, res) => {
    const {name, surname} = req.body;
    const { id } = usersGetToken(req);
    const sqlQuery = 
    'INSERT INTO exhibitors (name, surname, userId) VALUES (?, ?, ?)';

    connection.execute(sqlQuery, [name, surname, id], () => {
        connection.execute('SELECT * FROM exhibitors WHERE userId=?', 
        [id], (err, result) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }

            res.send(result)
        })
    })
});

app.delete('/exhibitors/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { id: userId } = usersGetToken(req);

    connection.execute('DELETE FROM exhibitors WHERE userId=? AND id=?',
     [userId, id], () => {
        connection.execute('SELECT * FROM exhibitors WHERE userId=?', 
        [userId], (err, result) => {
            res.send(result);
        })
    })
});

app.post('/register', (req, res) => {
    const { email, password, name, surname } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    connection.execute('INSERT INTO admins (email, password, name, surname) VALUES (?, ?, ?, ?)', 
    [email, hashedPassword, name, surname], (err, result) => {
        if (err?.code === 'ER_DUP_ENTRY') {
            res.sendStatus(400);
        }

        res.send(result);
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.execute(
        'SELECT * FROM admins WHERE email=?',
        [email],
        (err, result) => {
            if (result.length === 0) {
                res.sendStatus(401);
            } else {
                const passwordHash = result[0].password
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    const { id, email } = result[0];
                    const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {expiresIn: ''});
                    res.send({ token, id, email });
                } else {
                    res.sendStatus(401);
                }
            }
        }
    );
});

app.get('/token/verify', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.send(user);
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
});



app.listen(8080, () => console.log('It is OK'))