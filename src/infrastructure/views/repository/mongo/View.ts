import mongoose, { Schema } from 'mongoose';
import { IView } from 'src/interfaces/view';

const viewSchema = new mongoose.Schema<IView>(
  {
    // @ts-ignore
    _id: { type: Schema.Types.ObjectId, alias: 'id' },
    ip: String,
    dateAccess: Date,
  },
  {
    timestamps: true,
  },
);

export const View = mongoose.model<IView>('View', viewSchema);
