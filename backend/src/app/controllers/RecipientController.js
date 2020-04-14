/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });
    if (recipientExists) {
      return res.status(400).json('This recipient already exist');
    }
    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    } = await Recipient.create(req.body);
    return res.json({ id, name, street, number, complement, city, state, cep });
  }

  async update(req, res) {
    const { id } = req.params;
    const recipientExists = await Recipient.findOne({
      where: { id },
    });
    if (!recipientExists) {
      return res.status(400).json('This recipient does not exist');
    }

    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    } = await recipientExists.update(req.body);
    return res.json({ id, name, street, number, complement, city, state, cep });
  }

  async delete(req, res) {
    const { id } = req.params;
    const recipientExists = await Recipient.findOne({
      where: { id },
    });
    if (!recipientExists) {
      return res.status(400).json('This recipient does not exist');
    }
    recipientExists.destroy();
    return res.json('Recipient deleted');
  }

  async list(req, res) {
    const { page = 1, nameRecipient } = req.query;

    if (nameRecipient) {
      const recipients = await Recipient.findAll({
        where: { name: { [Op.iLike]: nameRecipient } },
        limit: 6,
        offset: (page - 1) * 6,
        attributes: [
          'id',
          'name',
          'street',
          'number',
          'complement',
          'city',
          'state',
          'cep',
        ],
      });
      return res.json(recipients);
    }

    const recipients = await Recipient.findAll({
      limit: 6,
      offset: (page - 1) * 6,
      order: ['created_at'],
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'cep',
      ],
    });
    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = Recipient.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'cep',
      ],
    });
    return res.json(recipient);
  }
}
export default new RecipientController();
