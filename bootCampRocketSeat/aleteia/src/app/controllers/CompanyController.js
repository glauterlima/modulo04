import * as Yup from 'yup';
import Company from '../models/Company';

class CompanyController {
  async index(req, res) {
    const companies = await Company.findAll({
      order: ['name'],
      attributes: ['id', 'cnpj', 'name'],
    });
    return res.json(companies);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, cnpj, name, email } = await Company.create(req.body);
    return res.json({
      id,
      cnpj,
      name,
      email,
    });
  }
}
export default new CompanyController();
