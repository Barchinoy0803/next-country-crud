export interface Country {
    id: string;
    name: string;
    capital: string;
    cityCount: string;
}

export interface CreateEditDialogType {
    isOpen: boolean;
    type: 'create' | 'edit';
    country?: Country;
}