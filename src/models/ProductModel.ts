import mongoose, { Schema, Document } from 'mongoose';


export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    images?: string[];
    createdAt: Date;
    stock: number;
}

const productSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
