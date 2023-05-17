import { User } from '../types/user.type';

class GreenApi {
  _baseUrl: string;
  _headers: HeadersInit;

  constructor(options: { baseUrl: string; headers: HeadersInit }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkAnswer(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getStatus({ id, apiToken }: User) {
    return fetch(
      `${this._baseUrl}/waInstance${id}/getStatusInstance/${apiToken}`,
      {
        headers: this._headers,
      }
    ).then(res => this._checkAnswer(res));
  }

  getMessages({ id, apiToken }: User, contact: string) {
    return fetch(
      `${this._baseUrl}/waInstance${id}/GetChatHistory/${apiToken}`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          chatId: `${contact}@c.us`,
        }),
      }
    ).then(res => this._checkAnswer(res));
  }

  sendMessage({ id, apiToken }: User, contact: string, message: string) {
    return fetch(`${this._baseUrl}/waInstance${id}/SendMessage/${apiToken}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        chatId: `${contact}@c.us`,
        message,
      }),
    }).then(res => this._checkAnswer(res));
  }

  getNotification({ id, apiToken }: User) {
    return fetch(
      `${this._baseUrl}/waInstance${id}/receiveNotification/${apiToken}`
    ).then(res => this._checkAnswer(res));
  }

  deleteNotification({ id, apiToken }: User, notificationId: string) {
    return fetch(
      `${this._baseUrl}/waInstance${id}/deleteNotification/${apiToken}/${notificationId}`,
      {
        method: 'DELETE',
      }
    ).then(res => this._checkAnswer(res));
  }
}

const greenApi = new GreenApi({
  baseUrl: 'https://api.green-api.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default greenApi;
