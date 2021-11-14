import mongoose, { mongo } from "mongoose";

export type ProductDocument = mongoose.Document & {
    productName: string;
    category: string;
    subcategory: [{
        type: string;
        model: [{
            type: string;
            color: [{
                name: string;
                image: string;
            }];
            size: [{
                val: number;
                price: number;
            }];
        }];
    }];
    description: string;
    picture: string;
};

const productSchema = new mongoose.Schema<ProductDocument>(
    {
        productName: String,
        category: String,
        subcategory: [{
            type: String,
            model: [{
                name: String,
                image: String
            }],
            size: [{
                val: Number,
                price: Number
            }]
        }],
        description: String,
        picture: String
    },
    { timestamps: true },
);

export const Product = mongoose.model<ProductDocument>("Product", productSchema);