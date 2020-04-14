/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import { Op } from 'sequelize';
import Signature from '../models/Signatures';
import Delivery from '../models/Delivery';

class SignatureController {
  async store(req, res) {
    const { idDelivery } = req.query;

    const { originalname: name, filename: path } = req.file;

    const { id } = await Signature.create({ name, path });

    const delivery = await Delivery.findOne({
      where: {
        id: idDelivery,
        start_date: { [Op.ne]: null },
        end_date: null,
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({
        error: 'Problem with the delivery, please enter the ID again',
      });
    }

    const signature_id = id;
    const end_date = new Date();

    const deliveryUpdate = { signature_id, end_date };

    await delivery.update(deliveryUpdate);

    return res.json({ id, name, path });
  }
}
export default new SignatureController();
