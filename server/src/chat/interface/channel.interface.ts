import { UserI } from "src/user/interfaces/user.interface";

export interface ChannelI {
  id?: number;
  name?: string;
  description?: string;
  users?: UserI[];
  created_at?: Date;
  updated_at?: Date;
}
