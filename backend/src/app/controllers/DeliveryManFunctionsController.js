/* eslint-disable class-methods-use-this */
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliveryManFunctionsController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findOne({
      where: { id },
      attributes: ['id', 'name', 'avatar_id', 'email', 'created_at'],
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
      ],
    });
    return res.json(deliverys);
  }
}

export default new DeliveryManFunctionsController();
