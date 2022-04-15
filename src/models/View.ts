import mongoose from 'mongoose';

export interface IView {
  ip: string;
  dateAcess: Date;
}

const viewSchema = new mongoose.Schema<IView>(
  {
    ip: String,
    dateAcess: Date,
  },
  {
    timestamps: true,
  },
);

export const View = mongoose.model<IView>('View', viewSchema);
