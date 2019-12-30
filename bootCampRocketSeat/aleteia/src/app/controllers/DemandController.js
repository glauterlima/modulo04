import * as Yup from 'yup';
import Demand from '../models/Demand';

class DemandController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      type: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, description, type } = await Demand.create(req.body);
    return res.json({
      id,
      description,
      type,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      type: Yup.string().required(),
      system: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const demand = await Demand.findByPk(req.demandId);

    const { id, description, type, system } = await demand.update(req.body);

    return res.json({
      id,
      description,
      type,
      system,
    });
  }
}

export default new DemandController();
