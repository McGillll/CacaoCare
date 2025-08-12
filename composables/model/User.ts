export interface User{
    id: Number,
    uuid: string,
    username:string | null,
    email: string,
    password: string,
    profile: string,
    region: string,
    province: string,
    city: string,
    barangay: string,
    role: string,
    email_verified_at: string | null
}