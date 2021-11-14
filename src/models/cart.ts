import mongoose, { mongo } from 'mongoose';

export type cartDocument = mongoose.Document & {
    productId: Object;
    quantity: number;
    price: number;
    total: number;
};

const cartSchema = new mongoose.Schema<cartDocument>(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity cna not be less than one']
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true,
        }
    }, {
        timestamps: true
    }
);

export const Cart = mongoose.model<cartDocument>("Cart", cartSchema);
