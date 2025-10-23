import BaseAPIService from "../BaseApiService";

class CommentService extends BaseAPIService {
    async getComments(cacaoId: number, page: number): Promise<any> {
        return await this.request(`/cacaos/${cacaoId}/comments?page=${page}`, "GET");
    }

    async createComment(cacaoId: number, data: { body: string }): Promise<any> {
        return await this.request(`/cacaos/${cacaoId}/comments`, "POST", data);
    }

    async updateComment(commentId: number, data: { body: string }): Promise<any> {
        return await this.request(`/comments/${commentId}`, "PUT", data);
    }

    async deleteComment(commentId: number): Promise<any> {
        return await this.request(`/comments/${commentId}`, "DELETE");
    }
}

export const commentService = new CommentService();
