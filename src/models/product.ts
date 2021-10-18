import mongoose, { mongo } from "mongoose";

export type ProductDocument = mongoose.Document & {
    productName: string;
    type: string;
    rating: number;
    seller: string;
    price: number;
    description: string;
    picture: string;

    productDetails: {
        manufacturer: string;
        manufacturesIdentification: string;
        productDimesions: string;
        manufacturerReference: string;
        color: string;
    };
};

const productSchema = new mongoose.Schema<ProductDocument>(
    {
        productName: String,
        type: String,
        rating: Number,
        seller: String,
        price: Number,
        description: String,
        picture: String,

        productDetails: {
            manufacturer: String,
            manufacturesIdentification: String,
            manufacturerReference: String,
            productDimesions: String,
            color: String
        }
    },
    { timestamps: true },
);

export const Product = mongoose.model<ProductDocument>("Product", productSchema);