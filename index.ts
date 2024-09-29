import express from 'express';
import { Request, Response } from 'express';
import path from 'path';

const app = express()

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = 8080;

app.use(express.static('public'))

app.get('/', function (req: Request, res: Response) {
	res.sendFile(path.resolve('index.html'))
})

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`)
})