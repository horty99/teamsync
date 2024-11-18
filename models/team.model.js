const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide team name'],
    trim: true
  },
  sport: {
    type: String,
    required: [true, 'Please specify sport']
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'club', 'enterprise'],
    default: 'free'
  },
  maxMembers: {
    type: Number,
    default: 10 // Free tier limit
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate members
teamSchema.virtual('members', {
  ref: 'User',
  foreignField: 'team',
  localField: '_id'
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;