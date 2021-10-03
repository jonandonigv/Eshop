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

const sequelize = new Sequelize('shop', 'root', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

// These are all the attributes in the Cart model
interface CartAttributes {
    id: number,
    ownerId: number,
    productId: number,
    quantity: number,
}

interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

export class Cart extends Model<CartAttributes, CartCreationAttributes>
    implements CartAttributes {
        public id!: number;
        public ownerId!: number;
        public productId!: number;
        public quantity!: number;

        // timestamps
        public readonly createdAt!: Date;
        public readonly updateAt!: Date;

        // Since TS cannot determine model association at compile time
        // we have to declare them here purely virutally
        // these will not exist until `Model.init` was called.
        public getProduct!: HasMany<Product>; // Note the null assertions!

        // You can also pre-declare possible inclusions, these will only be populated if you
        //activelly include a relation 
        public readonly product?: Product[]; // Note this is optional since it's only populated when explicitly requested in code.

        public static associations: {
            product: Association<Cart, Product>;
        }
    }