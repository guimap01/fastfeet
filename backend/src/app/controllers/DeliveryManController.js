/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });
    if (deliveryManExists) {
      return res.status(400).json('DeliveryMan Already Exist');
    }

    const { id, name, email } = await DeliveryMan.create(req.body);
    return res.json({ id, name, email });
  }

  async update(req, res) {
    const deliveryMans = await DeliveryMan.findByPk(req.params.id);

    if (deliveryMans.email === req.body.email) {
      const { name, avatar_id } = req.body;
      const response = { name, avatar_id };
      await deliveryMans.update(response);
      return res.json(deliveryMans);
    }
    if (req.body.email) {
      const deliveryManExist = await DeliveryMan.findOne({
        where: { email: req.body.email },
      });

      if (deliveryManExist) {
        return res.status(400).json({ error: 'Delivery Man already exists' });
      }

      await deliveryMans.update(req.body);

      return res.json(deliveryMans);
    }
    await deliveryMans.update(req.body);
    return res.json(deliveryMans);
  }

  async delete(req, res) {
    const { id } = req.query;

    const deliveryManExists = await DeliveryMan.findOne({
      where: { id },
    });
    if (!deliveryManExists) {
      return res.status(400).json('DeliveryMan does not Exist');
    }

    await deliveryManExists.destroy();
    return res.status(200).json('DeliveryMan Deleted');
  }

  async list(req, res) {
    const { page = 1, nameDeliveryMan } = req.query;

    if (nameDeliveryMan) {
      const deliveryMans = await DeliveryMan.findAll({
        where: { name: { [Op.iLike]: nameDeliveryMan } },
        limit: 6,
        offset: (page - 1) * 6,
        order: ['created_at'],
        attributes: ['id', 'name', 'avatar_id', 'email'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });
      return res.json(deliveryMans);
    }

    const deliveryMans = await DeliveryMan.findAll({
      limit: 6,
      offset: (page - 1) * 6,
      order: ['created_at'],
      attributes: ['id', 'name', 'avatar_id', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryMans);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findOne({
      where: { id },
      attributes: ['id', 'name', 'avatar_id', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryMan);
  }
}

export default new DeliveryManController();
