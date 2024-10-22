import mongoose from 'mongoose';
import { IView } from '../../../api/interfaces/view';

const viewSchema = new mongoose.Schema<IView>(
  {
    ip: String,
    dateAccess: Date,
  },
  {
    timestamps: true,
    id: true,
  },
);

export const View = mongoose.model<IView>('View', viewSchema);
