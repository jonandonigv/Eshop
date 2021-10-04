import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
} from 'sequelize';

import {Cart} from '../models/cart';

const sequelize = new Sequelize('shop', 'root', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

// These are all the attributes in the User model
interface UserAttributes {
    id: number,
    name: string,
    email: string,
    password: string,
}

// Some attributes are optionl in `User.build` and `User.create` calls.
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
        public id!: number; // Note that the `null assertion` `!` is required in strict mode.
        public name!: string;
        public email!: string;
        public password!: string;

        // Timestamps!
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;

        // Since TS cannot determine model association at compile time
        // we have to declare them here purely virtually
        // these will not exist until `Model.init` was called.
        public getCart!: HasManyGetAssociationsMixin<Cart>; // Note the null assertions!
        public addCart!: HasManyAddAssociationMixin<Cart, number>;
        public hasCart!: HasManyHasAssociationMixin<Cart, number>;
        public countCarts!: HasManyCountAssociationsMixin;
        public createCart!: HasManyCreateAssociationMixin<Cart>;

        // You can also pre-declare possible inclusions, these will only be populated if you
        //actively include a relation
        public readonly cart?: Cart[]; // Note this is optional since it's onlu populated when explicitly requested in code.

        public static associations: {
            cart: Association<User, Cart>;
        };
    }

    User.init(
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          email: {
              type: new DataTypes.STRING(128),
              allowNull: false,
          },
          password: {
            type: new DataTypes.STRING(16),
            allowNull: false
          }
        },
        {
          tableName: "users",
          sequelize, // passing the `sequelize` instance is required
        }
      );