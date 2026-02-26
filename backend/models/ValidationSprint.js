import mongoose from 'mongoose';

const validationSprintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  },
  day1Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  day2Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  day3Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  day4Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  day5Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  day6Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  day7Status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  uploadedProof: [{
    day: Number,
    type: String,
    content: String,
    uploadedAt: Date
  }],
  objections: [{
    type: String
  }],
  startedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ValidationSprint', validationSprintSchema);

