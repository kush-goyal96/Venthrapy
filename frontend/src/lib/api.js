import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const fetchTherapists = async () => {
  const { data } = await axios.get(`${baseUrl}/api/therapists`);
  const list = data?.therapists || [];
  return list.map((t) => ({
    id: t._id || t.id,
    name: t.name,
    image: t.image,
    specializations: Array.isArray(t.specializations) ? t.specializations : [],
    languages: Array.isArray(t.languages) ? t.languages : [],
    sessionCost: t.sessionCost,
    title: t.title,
    experience: t.experience,
    bio: t.bio,
    approach: t.approach,
    education: t.education,
    availability: t.availability,
    sessionDuration: t.sessionDuration,
    therapyType: t.therapyType,
    ageGroups: Array.isArray(t.ageGroups) ? t.ageGroups : [],
    modalities: Array.isArray(t.modalities) ? t.modalities : [],
    certifications: Array.isArray(t.certifications) ? t.certifications : [],
    areasOfExpertise: Array.isArray(t.areasOfExpertise)
      ? t.areasOfExpertise
      : [],
  }));
};

export const fetchTherapistById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/api/therapists/${id}`);
  const t = data?.therapist || data;
  return {
    id: t._id || t.id,
    name: t.name,
    image: t.image,
    specializations: Array.isArray(t.specializations) ? t.specializations : [],
    languages: Array.isArray(t.languages) ? t.languages : [],
    sessionCost: t.sessionCost,
    title: t.title,
    experience: t.experience,
    bio: t.bio,
    approach: t.approach,
    education: t.education,
    availability: t.availability,
    sessionDuration: t.sessionDuration,
    therapyType: t.therapyType,
    ageGroups: Array.isArray(t.ageGroups) ? t.ageGroups : [],
    modalities: Array.isArray(t.modalities) ? t.modalities : [],
    certifications: Array.isArray(t.certifications) ? t.certifications : [],
    areasOfExpertise: Array.isArray(t.areasOfExpertise)
      ? t.areasOfExpertise
      : [],
  };
};

export const fetchBlogs = async () => {
  const { data } = await axios.get(`${baseUrl}/api/blogs`);
  const list = data?.blogs || [];
  return list.map((b) => ({
    id: b._id || b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    author: b.author,
    coverImage: b.coverImage,
    readTime: b.readTime,
    publishedAt: b.publishedAt,
  }));
};

export const fetchBlogById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/api/blogs/${id}`);
  const b = data?.blog || data;
  return {
    id: b._id || b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    author: b.author,
    coverImage: b.coverImage,
    readTime: b.readTime,
    publishedAt: b.publishedAt,
  };
};

export const fetchMeditations = async () => {
  const { data } = await axios.get(`${baseUrl}/api/meditations`);
  const list = data?.meditations || [];
  return list.map((m) => ({
    id: m._id || m.id,
    title: m.title,
    slug: m.slug,
    duration: m.duration,
    description: m.description,
    audioUrl: m.audioUrl,
    tags: Array.isArray(m.tags) ? m.tags : [],
  }));
};

export const fetchMeditationBySlug = async (slug) => {
  const { data } = await axios.get(`${baseUrl}/api/meditations/${slug}`);
  const m = data?.meditation || data;
  return {
    id: m._id || m.id,
    title: m.title,
    slug: m.slug,
    duration: m.duration,
    description: m.description,
    audioUrl: m.audioUrl,
    tags: Array.isArray(m.tags) ? m.tags : [],
  };
};

// Auth API methods
export const signup = async (userData) => {
  const { data } = await axios.post(`${baseUrl}/api/auth/register`, userData, {
    withCredentials: true,
  });
  return data;
};

export const login = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/api/auth/login`, credentials, {
    withCredentials: true,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axios.post(
    `${baseUrl}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${baseUrl}/api/auth/me`, {
    withCredentials: true,
  });
  return data;
};
