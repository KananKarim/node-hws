import { AppDataSource } from "../data-source.ts";
import { News } from "../entity/news.entity.ts";

interface INews {
  title: string;
  text: string;
  authodId: number;
}

const newsRepository = AppDataSource.getRepository(News);

const getNews = async ({ page, size }) => {
  const news = await newsRepository.find();

  const startIndex = (page - 1) * size;
  const endIndex = page * size;
  const data = news.slice(startIndex, endIndex);
  return data;
};

const getNewsByID = async (id: number) => {
  const news = await newsRepository.findOneBy({ id });
  return news;
};

const addNews = async (body: INews) => {
  try {
    const newPost = await newsRepository.create(body);
    const results = await newsRepository.save(newPost);

    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const editNews = async (id: number, body: INews) => {
  const editedNews = await newsRepository.findOneBy({
    id,
  });
  newsRepository.merge(editedNews, body);
  const result = await newsRepository.save(editedNews);
  return result;
};

const deleteNews = async (id: number) => {
  const results = await newsRepository.delete(id);
  return results;
};

export default {
  getNews,
  getNewsByID,
  addNews,
  editNews,
  deleteNews,
};