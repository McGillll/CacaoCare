class Redirect{
    async checkAdminPrevillage(role: string) {
        if(role === 'admin'){
            return navigateTo('/admin')
        }
    }
    async checkUserPrevillage(role: string) {
        if(role === 'user'){
            return navigateTo('/user')
        }
    }
}
export const redirectService = new Redirect();