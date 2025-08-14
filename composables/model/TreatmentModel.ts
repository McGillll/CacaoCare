export interface Treatment {
	id: number
	disease: string
	short_description: string
	keypoints: KeyPoint[]
	img_url: string
	updated_at: string
}

export interface KeyPoint {
    id: number
    disease_id: number
	title: string
	detailed_step: string
}