import mongoose from 'mongoose';

export interface IView {
  ip: string;
  dateAccess: Date;
}

const viewSchema = new mongoose.Schema<IView>(
  {
    ip: String,
    dateAccess: Date,
  },
  {
    timestamps: true,
  },
);

export const View = mongoose.model<IView>('View', viewSchema);
