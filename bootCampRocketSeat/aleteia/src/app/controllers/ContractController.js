import * as Yup from 'yup';
import Contract from '../models/Contract';
import Company from '../models/Company';

class ContractController {
  async index(req, res) {
    const { page = 1 } = req.query; /** paginação */

    const contracts = await Contract.findAll({
      order: ['numero_contrato'],
      attributes: [
        'id',
        'numero_contrato',
        'sei',
        'vigencia',
        'qtd_pf_total',
        'preco_unit_pf',
        'preco_total_contrato',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(contracts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      numero_contrato: Yup.string().required(),
      sei: Yup.string().required(),
      vigencia: Yup.number().required(),
      qtd_pf_total: Yup.number().required(),
      preco_unit_pf: Yup.number().required(),
      preco_total_contrato: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      sei,
      vigencia,
      qtd_pf_total,
      preco_unit_pf,
      preco_total_contrato,
    } = await Contract.create(req.body);
    return res.json({
      id,
      sei,
      vigencia,
      qtd_pf_total,
      preco_unit_pf,
      preco_total_contrato,
    });
  }

  /* async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      type: Yup.string().required(),
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
  } */
}

export default new ContractController();
