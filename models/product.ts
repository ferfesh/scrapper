import { Schema, model, Types } from 'mongoose';
import User from './userModel';

export interface IProduct {
    _id: Types.ObjectId;
    owner: Types.ObjectId;
    name: string;
    price: number;
    url: string;
    website: string;
    category: string;
    status: number;
}
const productSchema = new Schema<IProduct>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1,
    },
}, { timestamps: true })

const Product = model('products', productSchema);

export default Product;