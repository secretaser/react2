import axios from "axios";

export default class PostService {
   static async getAll(limit = 10, page = 1) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
         {
            params: {
               _limit: limit,
               _page: page
            }
         })
      return response
   }
   static async getPostById(post) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post}`)
      return response
   }
   static async getCommentsByPostId(post, limit = 1) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post}/comments`,
         {
            params: {
               _limit: limit,
            }
         })
      return response
   }
}