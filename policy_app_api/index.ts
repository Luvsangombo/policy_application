
import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import error_handler from "./src/middlewares/error_handler";

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(json());



app.use("/", router);
app.use(error_handler);

app.listen(3000, () => console.log(`listening to 3000`));