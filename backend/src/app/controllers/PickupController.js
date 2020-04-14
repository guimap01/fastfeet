/* eslint-disable class-methods-use-this */
import { startOfDay, endOfDay, getHours } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class PickupController {
  async index(req, res) {
    const { id } = req.params;
    const { delivered } = req.query;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: delivered ? { [Op.ne]: null } : null,
      },
      order: ['id'],
      attributes: [
        'id',
        'product',
        'createdAt',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
      ],
    });

    if (!deliveries) {
      return res.status(400).json({ error: 'No deliveries' });
    }

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id, deliveries_id } = req.params;

    const deliveries = await Delivery.findAll({
      where: {
        id: deliveries_id,
        deliveryman_id: id,
        canceled_at: null,
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
      ],
    });

    if (!deliveries) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(deliveries);
  }

  async update(req, res) {
    const { idDelivery, idDeliveryMan } = req.query;

    // Check if the delivery exist
    const deliveryExist = await Delivery.findByPk(idDelivery);
    if (!deliveryExist) {
      return res
        .status(400)
        .json({ error: `There is no product with the ID: ${idDelivery}` });
    }

    // Check if deliveryMan exist
    const idDeliveryManExist = await DeliveryMan.findByPk(idDeliveryMan);
    if (!idDeliveryManExist) {
      return res.status(400).json({
        error: `There is no DeliveryMan with the ID: ${idDeliveryMan}`,
      });
    }

    // Check if delivery and deliveryman id matches
    const deliveryRight = await Delivery.findOne({
      where: { id: idDelivery, deliveryman_id: idDeliveryMan },
    });
    if (!deliveryRight) {
      return res
        .status(400)
        .json(
          `The delivery: ${idDelivery} does not belong to the DeliveryMan ${idDeliveryMan}`
        );
    }
    // Check if the delivery does not have been already taken
    const deliveryTaken = await Delivery.findOne({
      where: { id: idDelivery, start_date: null },
    });
    if (!deliveryTaken) {
      return res.status(400).json({
        error: `The Delivery ${idDelivery} has already been taken`,
      });
    }
    // Check if he is in time to pickup the delivery
    const hour = getHours(new Date());
    if (hour < 8 || hour >= 18) {
      return res
        .status(400)
        .json('Products can only be taken between 8:00 and 18:00 ');
    }

    // Check if he does't get 5 deliveries yet

    const date = new Date();
    const countDelivery = await Delivery.count({
      where: {
        deliveryman_id: idDeliveryMan,
        start_date: { [Op.between]: [startOfDay(date), endOfDay(date)] },
      },
    });
    if (countDelivery > 5) {
      return res
        .status(400)
        .json(
          `The DeliveryMan: ${idDeliveryMan} already pickup 5 deliveries today`
        );
    }
    // Update the start_date from delivery
    await deliveryExist.update({
      start_date: new Date(),
    });

    return res.json(
      `The Order ID:${idDelivery} has been taken by DeliveryMan ID:${idDeliveryMan}`
    );
  }
}
export default new PickupController();
