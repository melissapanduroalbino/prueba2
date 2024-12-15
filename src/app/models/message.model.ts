export interface Message {
  id: number;
  content: string;
  isEditing: boolean;
  isDeleted: boolean;
  timestamp: Date;
}