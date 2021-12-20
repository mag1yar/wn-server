export interface OutputBlockData {
  id?: string;
  type: 'header' | 'paragraph' | 'delimiter' | string;
  data: any;
}
