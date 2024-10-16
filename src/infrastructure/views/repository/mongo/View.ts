import mongoose from 'mongoose';
import { IView } from 'src/interfaces/view';

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

viewSchema.virtual('id').get(function () {
  return this._id;
});

export const View = mongoose.model<IView>('View', viewSchema);
