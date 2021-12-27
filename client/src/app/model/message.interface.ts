import { ChannelI } from "./channel.interface";
import { UserI } from "./user.interface";
import { Meta } from "./meta.interface";

export interface MessageI {
  id?: number;
  text: string;
  user?: UserI;
  channel: ChannelI;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessagePaginateI {
  items: MessageI[];
  meta: Meta;
}
