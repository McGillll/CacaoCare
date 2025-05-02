import { authService } from "../api/sevices/AuthService";
import type { User } from "../model/User";

export async function fetchCurrentUser(user: User):Promise<any>{
    try {
      const response = await authService.getCurrentUser();
      if (response.data) {
        return user = response.data;
      }
    } catch (error: any) {
      console.error("Error fetching user:", error);
    }
  }