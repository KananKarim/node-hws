import { AppDataSource } from "../data-source.ts";
import { News } from "../entity/news.entity.ts";
import { INews } from "../dto/news.dto.ts";

const newsRepository = AppDataSource.getRepository(News);

const getAllNews = async () => {
  const news = await newsRepository.find();
  return news;
};

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

const deleteNews = async (
  id: number
): Promise<{ deletedNews: News | null; affected: number }> => {
  const deletedNews = await newsRepository.findOne({ where: { id } });
  if (deletedNews) {
    const results = await newsRepository.delete(id);
    return { deletedNews, affected: results.affected || 0 };
  } else {
    return { deletedNews: null, affected: 0 };
  }
};

export default {
  getAllNews,
  getNews,
  getNewsByID,
  addNews,
  editNews,
  deleteNews,
};
