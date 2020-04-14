import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Signatures from '../app/models/Signatures';
import DeliveryMan from '../app/models/DeliveryMan';
import Delivery from '../app/models/Delivery';
import databaseConfig from '../config/database';
import DeliveryProblem from '../app/models/DeliveryProblem';

const models = [
  User,
  Recipient,
  File,
  DeliveryMan,
  Signatures,
  Delivery,
  DeliveryProblem,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model =>
      model.associate
        ? model.init(this.connection) + model.associate(this.connection.models)
        : model.init(this.connection)
    );
  }
}
export default new Database();
