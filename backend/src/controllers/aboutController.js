const asyncHandler = require('express-async-handler');
const About = require('../models/About');

const getAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({
      title: 'Passionate developer.',
      tagline: 'Who I Am',
      bio: [
        "I'm a Computer Science student at Bahir Dar University with a deep passion for building modern, accessible web applications.",
        "I'm actively exploring AI and machine learning to expand my technical expertise.",
      ],
      facts: [
        { icon: '🎓', label: 'Degree', value: 'B.Sc. Computer Science' },
        { icon: '🏫', label: 'University', value: 'Bahir Dar University' },
        { icon: '📍', label: 'Location', value: 'Bahir Dar, Ethiopia' },
        { icon: '💼', label: 'Focus', value: 'Full Stack Development' },
        { icon: '🤖', label: 'Interest', value: 'AI & Machine Learning' },
        { icon: '🌐', label: 'Languages', value: 'Amharic · English' },
      ],
    });
  }
  res.json({ success: true, data: about });
});

const updateAbout = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (typeof data.bio === 'string') data.bio = JSON.parse(data.bio);
  if (typeof data.facts === 'string') data.facts = JSON.parse(data.facts);
  if (typeof data.achievements === 'string') data.achievements = JSON.parse(data.achievements);

  let about = await About.findOne();
  if (!about) about = new About();
  Object.assign(about, data);
  await about.save();
  res.json({ success: true, data: about });
});

module.exports = { getAbout, updateAbout };
