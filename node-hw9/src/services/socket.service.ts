import { Server, Socket } from "socket.io";
import newsService from "./news.service.ts";


const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("addNews", (newspost) => {
      newsService.addNews(newspost).then((newPost) => {
        io.emit("addNews", {
          title: newPost.title,
          text: newPost.text,
        });
      });
    });

    socket.on("deleteNews", async (newspost) => {
      const result = await newsService.deleteNews(newspost.id);
      if (result.deletedNews) {
        io.emit("deleteNews", { id: result.deletedNews.id });
      }
    });

    socket.on("updateNews", async (newspost) => {
      const updatedNews = await newsService.editNews(newspost.id, newspost);
      if (updatedNews) {
        io.emit("updateNews", updatedNews);
      }
    });
  });

};


export default initializeSocket;