export type Message = {
  type: string;
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  textMessage: string;
  extendedTextMessage?: {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
  };
  statusMessage: string;
  senderId?: string;
  senderName?: string;
  downloadUrl?: string;
  caption?: string;
  location?: {
    nameLocation: string;
    address: string;
    latitude: number;
    longitude: number;
    jpegThumbnail: string;
  };
  contact?: {
    displayName: string;
    vcard: string;
  };
};
