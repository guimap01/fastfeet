import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliverymanExist, recipientExist, id } = data;

    await Mail.sendMail({
      to: `${deliverymanExist.name} <${deliverymanExist.email}>`,
      subject: 'New delivery for you',
      template: 'delivery',
      context: {
        name: deliverymanExist.name,
        idDelivery: id,
        nameRecipient: recipientExist.name,
        street: recipientExist.street,
        number: recipientExist.number,
        complement: recipientExist.complement,
        city: recipientExist.city,
        state: recipientExist.state,
        cep: recipientExist.cep,
      },
    });
  }
}
export default new DeliveryMail();
