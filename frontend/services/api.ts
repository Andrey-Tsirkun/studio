import axios from 'axios';
import { StrapiResponse, StrapiSingleResponse, Post } from '../types/strapi';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': API_TOKEN ? `Api-Token ${API_TOKEN}` : undefined,
  },
});

export const getPosts = async (): Promise<StrapiResponse<Post>> => {
  const response = await api.get('/api/posts?populate=*');
  return response.data;
};

export const getPost = async (slug: string): Promise<StrapiSingleResponse<Post>> => {
  const response = await api.get(`/api/posts/${slug}?populate=*`);
  return response.data;
}; 