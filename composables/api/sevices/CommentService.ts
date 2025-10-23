import BaseAPIService from "../BaseApiService";

class CommentService extends BaseAPIService {
    async getComments(cacaoId: number, page: number): Promise<any> {
        return await this.request(`/cacaos/${cacaoId}/comments?page=${page}`, "GET");
    }

    async createComment(cacaoId: number, data: object): Promise<any> {
        return await this.request(`/cacaos/${cacaoId}/comments`, "POST", data);
    }

    async updateComment(commentId: number, data: object): Promise<any> {
        return await this.request(`/comments/${commentId}?_method=PUT`, "POST", data);
    }

    async deleteComment(commentId: number): Promise<any> {
        return await this.request(`/comments/${commentId}`, "DELETE");
    }
}

export const commentService = new CommentService();
