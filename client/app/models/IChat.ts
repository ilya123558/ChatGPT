import { IUser } from "./IUser"

export interface ISendMessageOrCreateChat {
    chatId?: string,
    chatName: string,
    message: string
}

export interface IChat {
  _id: string
  user: IUser
  name: string
  chat: IMessage[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IMessage {
  entity: string
  message: string
  _id: string
}

export interface IUpdataChatName {
  chatId: string,
  name: string
}