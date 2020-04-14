/* eslint-disable class-methods-use-this */
import Delivery from '../models/Delivery';
import Queue from '../../lib/Queue';
import DeliveryMan from '../models/DeliveryMan';
import CancellationMail from '../jobs/CancellationMail';

class CancelDeliveryProblemController {
  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (delivery.canceled_at) {
      return res
        .status(400)
        .json({ error: `The delivery ID:${delivery.id} is already canceled` });
    }

    if (!delivery) {
      return res
        .status(400)
        .json({ error: `There is no delivery with the ID:${req.params.id}` });
    }

    const deliverymanExist = await DeliveryMan.findByPk(
      delivery.deliveryman_id
    );

    await delivery.update({ canceled_at: new Date() });

    await Queue.add(CancellationMail.key, { deliverymanExist, delivery });

    return res.json(`The delivery ID:${delivery.id} was cancelled`);
  }
}

export default new CancelDeliveryProblemController();
