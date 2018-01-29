import express from 'express';
import User from '../models/User';
const router = express.Router();
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../utils/mailer';

router.post('/', (req, res) => {
    const { email, password } = req.body.user;
    const user = new User({ email });
    user.setPassword(password);
    user.setConfirmationToken();
    user.save()
    .then(userRecord => {
        sendConfirmationEmail(userRecord);
        res.json({user: userRecord.toAuthJSON()});
    })
    .catch(err => {
        res.status(400).json({ errors: parseErrors(err.errors) });
    });
});

export default router;