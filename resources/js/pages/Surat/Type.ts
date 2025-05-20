export type LetterParams = {
    id: number;
    name: string;
    code: string;
    status: string;
    file?: string;
    description?: string;
    is_private?: boolean | number;
    type_letter_name: string;
    type_letter_id: number;
    url: string;
    accepted_at: string;
};

export type TypeLetterParams = {
    id: number;
    name: string;
    is_private: boolean;
    documents_count: number;
    slug: string;
};
