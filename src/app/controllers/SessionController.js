import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { User } from '../models';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    const { body } = req;

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;
    const { secret, expiresIn } = authConfig;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, secret, { expiresIn }),
    });
  }
}

export default new SessionController();
