export type LetterParams = {
    id: number;
    name: string;
    code: string;
    status: string;
    file?: string;
    description?: string;
    is_private?: boolean;
    type_letter_name: string;
};

export type TypeLetterParams = {
    id: number;
    name: string;
    is_private: boolean;
    documents_count: number;
};
