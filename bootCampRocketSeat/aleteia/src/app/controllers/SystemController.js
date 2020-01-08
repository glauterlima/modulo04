import * as Yup from 'yup';
import System from '../models/System';

class SystemController {
  async index(req, res) {
    const { page = 1 } = req.query; /** paginação */

    const systems = await System.findAll({
      order: ['name'],
      attributes: ['id', 'name', 'responsavel', 'fronteira', 'linguagem'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(systems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      responsavel: Yup.string().required(),
      fronteira: Yup.string().required(),
      linguagem: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, responsavel, fronteira, linguagem } = await System.create(
      req.body
    );
    return res.json({
      id,
      name,
      responsavel,
      fronteira,
      linguagem,
    });
  }
}
export default new SystemController();
