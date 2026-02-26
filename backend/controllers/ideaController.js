import Idea from '../models/Idea.js';

export const createIdea = async (req, res) => {
  try {
    const { targetCustomer, problem, alternatives, whyPay, unfairAdvantage } = req.body;

    if (!targetCustomer || !problem || !alternatives || !whyPay || !unfairAdvantage) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate problem statement
    const generatedProblemStatement = `We help ${targetCustomer} who struggle with ${problem} by offering ${unfairAdvantage} instead of ${alternatives}.`;

    // Generate ICP
    const generatedICP = {
      stage: targetCustomer,
      corePain: problem,
      existingBehavior: alternatives,
      valueDriver: whyPay
    };

    // Generate positioning
    const generatedPositioning = `[Product Name] for ${targetCustomer} to solve ${problem}.`;

    const idea = new Idea({
      userId: req.userId,
      targetCustomer,
      problem,
      alternatives,
      whyPay,
      unfairAdvantage,
      generatedProblemStatement,
      generatedICP,
      generatedPositioning
    });

    await idea.save();

    res.status(201).json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id, userId: req.userId });
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIdea = async (req, res) => {
  try {
    const { targetCustomer, problem, alternatives, whyPay, unfairAdvantage } = req.body;

    const idea = await Idea.findOne({ _id: req.params.id, userId: req.userId });
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Update fields
    if (targetCustomer) idea.targetCustomer = targetCustomer;
    if (problem) idea.problem = problem;
    if (alternatives) idea.alternatives = alternatives;
    if (whyPay) idea.whyPay = whyPay;
    if (unfairAdvantage) idea.unfairAdvantage = unfairAdvantage;

    // Regenerate outputs
    idea.generatedProblemStatement = `We help ${idea.targetCustomer} who struggle with ${idea.problem} by offering ${idea.unfairAdvantage} instead of ${idea.alternatives}.`;
    idea.generatedICP = {
      stage: idea.targetCustomer,
      corePain: idea.problem,
      existingBehavior: idea.alternatives,
      valueDriver: idea.whyPay
    };
    idea.generatedPositioning = `[Product Name] for ${idea.targetCustomer} to solve ${idea.problem}.`;

    await idea.save();
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

