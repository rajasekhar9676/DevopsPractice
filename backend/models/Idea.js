import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetCustomer: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  alternatives: {
    type: String,
    required: true
  },
  whyPay: {
    type: String,
    required: true
  },
  unfairAdvantage: {
    type: String,
    required: true
  },
  generatedProblemStatement: {
    type: String,
    default: ''
  },
  generatedICP: {
    type: Object,
    default: {}
  },
  generatedPositioning: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Idea', ideaSchema);

