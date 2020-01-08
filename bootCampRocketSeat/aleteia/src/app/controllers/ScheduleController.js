import { startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Count from '../models/Count';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const counts = await Count.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfMonth(parsedDate), endOfMonth(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(counts);
  }
}

export default new ScheduleController();
