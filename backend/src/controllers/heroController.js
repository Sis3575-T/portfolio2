const asyncHandler = require('express-async-handler');
const Hero = require('../models/Hero');

// GET /api/hero
const getHero = asyncHandler(async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) {
    hero = await Hero.create({
      name: 'Sisay Temesgen',
      title: 'Full Stack Developer & AI Enthusiast',
      description: 'Computer Science student at Bahir Dar University, building modern web applications with React, Node.js, and MongoDB.',
      availableForWork: true,
      stats: [
        { number: '7+', label: 'Technologies' },
        { number: '2+', label: 'Projects' },
        { number: '3+', label: 'Yrs Learning' },
      ],
    });
  }
  res.json({ success: true, data: hero });
});

// PUT /api/hero (admin)
const updateHero = asyncHandler(async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) hero = new Hero();
  Object.assign(hero, req.body);
  if (req.file) hero.profileImage = req.file.path;
  await hero.save();
  res.json({ success: true, data: hero });
});

module.exports = { getHero, updateHero };
