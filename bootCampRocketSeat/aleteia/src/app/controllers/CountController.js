import * as Yup from 'yup';
import Count from '../models/Count';
import User from '../models/User';
import File from '../models/File';
import Demand from '../models/Demand';
import System from '../models/System';

class CountController {
  async index(req, res) {
    const { page = 1 } = req.query; /** paginação */

    const counts = await Count.findAll({
      where: { canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Demand,
          as: 'demand',
          attributes: ['id', 'name', 'description', 'type'],
          include: [
            {
              model: System,
              as: 'system',
              attributes: [
                'id',
                'name',
                'responsavel',
                'fronteira',
                'linguagem',
              ],
            },
          ],
        },
      ],
    });

    return res.json(counts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
      demand_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date, demand_id } = req.body;

    /**
     * Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create counts with providers' });
    }

    /**
     * Check if demand_id is a demand (to do)
     */

    const count = await Count.create({
      user_id: req.userId,
      provider_id,
      demand_id,
      date,
    });

    return res.json(count);
  }
}
export default new CountController();
