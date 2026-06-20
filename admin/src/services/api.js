const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('adminToken');

const headers = (isFormData = false) => {
  const h = {};
  if (!isFormData) h['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
};

const request = async (method, path, body = null, isFormData = false) => {
  const opts = { method, headers: headers(isFormData) };
  if (body) opts.body = isFormData ? body : JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// Auth
export const getMe = () => request('GET', '/auth/me');

// Projects
export const getProjects = (params = '') => request('GET', `/projects${params}`);
export const createProject = (form) => request('POST', '/projects', form, true);
export const updateProject = (id, form) => request('PUT', `/projects/${id}`, form, true);
export const deleteProject = (id) => request('DELETE', `/projects/${id}`);

// Skills
export const getSkills = (all = false) => request('GET', `/skills${all ? '?all=true' : ''}`);
export const createSkill = (data) => request('POST', '/skills', data);
export const updateSkill = (id, data) => request('PUT', `/skills/${id}`, data);
export const deleteSkill = (id) => request('DELETE', `/skills/${id}`);

// Messages
export const getMessages = (params = '') => request('GET', `/messages${params}`);
export const markMessageRead = (id, read) => request('PUT', `/messages/${id}/read`, { read });
export const deleteMessage = (id) => request('DELETE', `/messages/${id}`);
export const getUnreadCount = () => request('GET', '/messages/unread-count');

// Blog
export const getBlogs = (params = '') => request('GET', `/blog${params}`);
export const createBlog = (form) => request('POST', '/blog', form, true);
export const updateBlog = (id, form) => request('PUT', `/blog/${id}`, form, true);
export const deleteBlog = (id) => request('DELETE', `/blog/${id}`);

// Settings
export const getSettings = () => request('GET', '/settings');
export const updateSettings = (form) => request('PUT', '/settings', form, true);

// Hero
export const getHero = () => request('GET', '/hero');
export const updateHero = (form) => request('PUT', '/hero', form, true);

// About
export const getAbout = () => request('GET', '/about');
export const updateAbout = (data) => request('PUT', '/about', data);
