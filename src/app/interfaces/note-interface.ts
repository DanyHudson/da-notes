export interface NoteInterface {
    id: string;
    type: "note" | "trash";
    title:string;
    content:string;
    marked: boolean;
}
