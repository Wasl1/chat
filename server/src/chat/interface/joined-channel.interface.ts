import { UserI } from "src/user/interfaces/user.interface";
import { ChannelI } from "./channel.interface";

export interface JoinedChannelI {
  id?: number;
  socketId: string;
  user: UserI;
  channel: ChannelI;
}