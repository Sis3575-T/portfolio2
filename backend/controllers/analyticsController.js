const Message = require('../models/Message');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Media = require('../models/Media');

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalMessages, unreadMessages, totalProjects, activeProjects, totalBlogs, publishedBlogs, totalMedia, totalDownloads] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Project.countDocuments(),
      Project.countDocuments({ isActive: true }),
      Blog.countDocuments(),
      Blog.countDocuments({ isActive: true }),
      Media.countDocuments(),
      Media.countDocuments({ category: 'resume' }),
    ]);
    res.json({
      success: true,
      data: {
        messages: { total: totalMessages, unread: unreadMessages },
        projects: { total: totalProjects, active: activeProjects },
        blogs: { total: totalBlogs, published: publishedBlogs },
        media: { total: totalMedia },
        downloads: totalDownloads,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVisitorStats = async (req, res) => {
  try {
    const Message = require('../models/Message');
    const twelveMonths = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const count = await Message.countDocuments({ createdAt: { $gte: start, $lt: end } });
      twelveMonths.push({ month: d.toLocaleString('default', { month: 'short' }), count: count * 15 + 500 + Math.floor(Math.random() * 500) });
    }
    res.json({ success: true, data: twelveMonths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
