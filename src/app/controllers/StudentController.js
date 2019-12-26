import * as Yup from 'yup';

import { Student } from '../models';

const schemaStore = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  age: Yup.number(),
  weight: Yup.number(),
  height: Yup.number(),
});

const schemaUpdate = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  age: Yup.number(),
  weight: Yup.number(),
  height: Yup.number(),
});

class StudentSession {
  async store(req, res) {
    const { body } = req;

    if (!(await schemaStore.isValid(body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.create(body);

    const { id, name, email, age, weight, height } = student;

    return res.status(201).json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {}
}

export default new StudentSession();
