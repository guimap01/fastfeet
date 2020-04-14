/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery_id = req.params.id;

    const deliveryExist = await Delivery.findByPk(delivery_id);
    if (!deliveryExist) {
      return res
        .status(400)
        .json({ error: `Does not exist delivery with the ID:${delivery_id}` });
    }

    req.body.delivery_id = delivery_id;

    const { description } = await DeliveryProblem.create(req.body);

    return res.json({ delivery_id, description });
  }

  async index(req, res) {
    const { page = 1, deliveryID } = req.query;
    if (deliveryID) {
      const problems = await DeliveryProblem.findAll({
        limit: 6,
        offset: (page - 1) * 6,
        where: { delivery_id: deliveryID },
        attributes: ['id', 'description', 'delivery_id', 'created_at'],
      });
      return res.json(problems);
    }

    const problems = await DeliveryProblem.findAll({
      limit: 6,
      offset: (page - 1) * 6,
      attributes: ['id', 'description', 'delivery_id', 'created_at'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['deliveryman_id', 'recipient_id', 'product'],
        },
      ],
    });
    return res.json(problems);
  }

  async show(req, res) {
    const { id } = req.params;
    const problems = await DeliveryProblem.findAll({
      where: { id },
      attributes: ['id', 'description', 'delivery_id'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['deliveryman_id', 'recipient_id', 'product'],
        },
      ],
    });
    return res.json(problems);
  }
}
export default new DeliveryProblemController();
