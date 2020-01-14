import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Count from '../models/Count';

class TaskDayController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date);

    const counts = await Count.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    return res.json(counts);
  }
}

export default new TaskDayController();
