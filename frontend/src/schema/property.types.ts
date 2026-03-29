export type Favorite = {
    id: number;
    property_id: number;
    user_id: number;
}

export type Property = {
    id: number;
    title: string;
    description: string;
    price: string;
    area: string;
    city: string;
    province: string;
    fav?: Favorite;
}

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export type PropertyResponse = {
    data: Property[];
    pagination: Pagination;
}