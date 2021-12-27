import { UserI } from "src/user/interfaces/user.interface";
import { ChannelI } from "./channel.interface";

export interface MessageI {
  id?: number;
  text: string;
  user: UserI;
  channel: ChannelI;
  created_at: Date;
  updated_at: Date;
}