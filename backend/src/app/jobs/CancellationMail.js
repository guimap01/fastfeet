import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliverymanExist, delivery } = data;
    await Mail.sendMail({
      to: `${deliverymanExist.name} <${deliverymanExist.email}>`,
      subject: 'Delivery Cancelled ',
      template: 'cancellation',
      context: {
        name: deliverymanExist.name,
        idCancellation: delivery.id,
      },
    });
  }
}
export default new CancellationMail();
