/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { getHours } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import Signatures from '../models/Signatures';
import Queue from '../../lib/Queue';
import DeliveryMail from '../jobs/DeliveryMail';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryController {
  async store(req, res) {
    // Schema Validation
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
      start_date: Yup.date(),
      canceled_at: Yup.date(),
      end_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Create the consts
    const {
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      end_date,
      start_date,
    } = req.body;

    // Check if the hour is correct
    if (start_date) {
      const hourStartDate = getHours(start_date);
      if (hourStartDate < 8 || hourStartDate > 18) {
        return res
          .status(400)
          .json('Products can only be taken between 8:00 and 18:00 ');
      }
    }

    // Check Recipient exist

    const recipientExist = await Recipient.findOne({
      where: { id: recipient_id },
    });
    if (!recipientExist) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    // Check DeliveryMan exist
    const deliverymanExist = await DeliveryMan.findOne({
      where: { id: deliveryman_id },
    });
    if (!deliverymanExist) {
      return res.status(400).json({ error: 'DeliveryMan does not exist' });
    }
    // Create
    const { id } = await Delivery.create(req.body);

    // Send Email
    await Queue.add(DeliveryMail.key, { deliverymanExist, id, recipientExist });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      end_date,
      start_date,
    });
  }

  async update(req, res) {
    // Schema Validation
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      start_date: Yup.date(),
      canceled_at: Yup.date(),
      end_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = req.body;
    const { id } = req.params;
    // Check Delivery existence
    const deliveryExist = await Delivery.findByPk(id);
    if (!deliveryExist) {
      return res
        .status(400)
        .json({ error: `There is no product with the ID: ${id}` });
    }

    // Update delivery
    deliveryExist.update(req.body);

    // Send email for if canceled

    if (canceled_at) {
      const deliverymanExist = await DeliveryMan.findByPk(
        deliveryExist.deliveryman_id
      );
      const delivery = await Delivery.findByPk(id);
      await Queue.add(CancellationMail.key, { deliverymanExist, delivery });
    }

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    // Schema Validation

    const { id } = req.params;

    // Check Delivery existence
    const deliveryExist = await Delivery.findByPk(id);
    if (!deliveryExist) {
      return res
        .status(400)
        .json({ error: `There is no product with the ID: ${id}` });
    }

    // Delete Delivery
    deliveryExist.destroy();

    return res.json(`The delivery ${id} has been deleted`);
  }

  async list(req, res) {
    const { page = 1, product } = req.query;

    if (product) {
      const deliverys = await Delivery.findAll({
        where: { product: { [Op.iLike]: product } },
        limit: 6,
        offset: (page - 1) * 6,
        order: ['created_at'],
        attributes: [
          'id',
          'recipient_id',
          'deliveryman_id',
          'signature_id',
          'product',
          'canceled_at',
          'start_date',
          'end_date',
        ],

        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'id',
              'name',
              'street',
              'number',
              'city',
              'state',
              'cep',
            ],
          },
          {
            model: DeliveryMan,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Signatures,
            as: 'signature',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });
      return res.json(deliverys);
    }
    const deliverys = await Delivery.findAll({
      limit: 6,
      offset: (page - 1) * 6,
      order: ['created_at'],
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],

      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'city',
            'state',
            'cep',
          ],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name', 'avatar_id', 'email'],
        },
        {
          model: Signatures,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliverys);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliverys = await Delivery.findOne({
      where: { id },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],

      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'city',
            'state',
            'cep',
          ],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name', 'avatar_id', 'email'],
        },
        {
          model: Signatures,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliverys);
  }
}
export default new DeliveryController();
