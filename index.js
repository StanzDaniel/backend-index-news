import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';

import { connect } from 'mongoose';
import { changePassword } from './midlewares/changePassword.midleware.js';
import { deleteUser } from './midlewares/delete.midleware.js';
import { isAuthenticated } from './midlewares/isAuthenticated.midleware.js';
import { loginUser } from './midlewares/login.midleware.js';
import { registerUser } from './midlewares/register.midleware.js';
import { returnUser } from './midlewares/returnUser.midleware.js';
import { setHistory } from './midlewares/setHistory.midleware.js';
import { updateUser } from './midlewares/update.midleware.js';
import { SECRET } from './models/secret.model.js';
import { auth } from './utilities/auth.utility.js';
import { error } from './utilities/error.utility.js';
import { changePasswordValidation } from './validators/changePassword.validator.js';
import { loginValidation } from './validators/login.validator.js';
import { registerValidation } from './validators/register.validator.js';
import { updateValidation } from './validators/update.validator.js';
import { setReadLater } from './midlewares/setReadLater.midleware.js';

import { setImage, upload } from './midlewares/setImage.midleware.js';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors())

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

await connect(SECRET.BD_CREDENTIALS)

app.use(auth); // access control

app.post('/register', registerValidation, upload.single('file'), registerUser);
app.post('/login', loginValidation, loginUser);
app.post('/validate', isAuthenticated, returnUser);
app.post('/deleteuser', isAuthenticated, deleteUser);
app.post('/updateuser', isAuthenticated, updateValidation, updateUser);
app.post('/changepassword', isAuthenticated, changePasswordValidation, changePassword);
app.post('/history', isAuthenticated, setHistory);
app.post('/readlater', isAuthenticated, setReadLater);
app.post('/setimage', upload.single('file'), isAuthenticated, setImage);




app.use(error)

app.listen(3000, () => console.log("connected"));
