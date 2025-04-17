import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare',
      'Shopping', 'Education', 'Savings', 'Other'
    ]
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Number, 
    required: true,
  },
  year: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

BudgetSchema.index({ category: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
