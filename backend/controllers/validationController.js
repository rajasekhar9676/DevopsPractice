import ValidationSprint from '../models/ValidationSprint.js';

export const createSprint = async (req, res) => {
  try {
    const { ideaId } = req.body;

    if (!ideaId) {
      return res.status(400).json({ message: 'Idea ID is required' });
    }

    // Check if sprint already exists
    const existingSprint = await ValidationSprint.findOne({ userId: req.userId, ideaId });
    if (existingSprint) {
      return res.status(400).json({ message: 'Sprint already exists for this idea' });
    }

    const sprint = new ValidationSprint({
      userId: req.userId,
      ideaId
    });

    await sprint.save();
    res.status(201).json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSprint = async (req, res) => {
  try {
    const sprint = await ValidationSprint.findOne({ 
      userId: req.userId, 
      ideaId: req.params.ideaId 
    }).populate('ideaId');

    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserSprints = async (req, res) => {
  try {
    const sprints = await ValidationSprint.find({ userId: req.userId })
      .populate('ideaId')
      .sort({ startedAt: -1 });
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDayStatus = async (req, res) => {
  try {
    const { day, status } = req.body;

    if (!day || !status) {
      return res.status(400).json({ message: 'Day and status are required' });
    }

    const dayField = `day${day}Status`;
    const sprint = await ValidationSprint.findOne({ 
      userId: req.userId, 
      ideaId: req.params.ideaId 
    });

    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    sprint[dayField] = status;
    await sprint.save();

    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadProof = async (req, res) => {
  try {
    const { day, type, content } = req.body;

    if (!day || !type || !content) {
      return res.status(400).json({ message: 'Day, type, and content are required' });
    }

    const sprint = await ValidationSprint.findOne({ 
      userId: req.userId, 
      ideaId: req.params.ideaId 
    });

    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    sprint.uploadedProof.push({
      day,
      type,
      content,
      uploadedAt: new Date()
    });

    await sprint.save();
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateObjections = async (req, res) => {
  try {
    const { objections } = req.body;

    if (!Array.isArray(objections)) {
      return res.status(400).json({ message: 'Objections must be an array' });
    }

    const sprint = await ValidationSprint.findOne({ 
      userId: req.userId, 
      ideaId: req.params.ideaId 
    });

    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    sprint.objections = objections;
    await sprint.save();

    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

