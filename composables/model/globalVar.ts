import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        username: '',
        profile: '',
    }),
    actions: {
        setUser(data: { username: string; profile: string }) {
            this.username = data.username;
            this.profile = data.profile;
        },
    },
});