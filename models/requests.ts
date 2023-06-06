import { Schema, model, Document } from "mongoose";

export interface IRequest {
  requests: number;
  products: number;
  failed: number;
  success: number;
  batch: number;
}

export interface IRequestModel extends IRequest, Document { }

const requestSchema = new Schema<IRequest>({
  requests: {
    type: Number,
    required: true,
  },
  products: {
    type: Number,
    required: true,
  },
  failed: {
    type: Number,
    default: 0
  },
  success: {
    type: Number,
    default: 0
  },
  batch: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const Request = model<IRequestModel>("Request", requestSchema);