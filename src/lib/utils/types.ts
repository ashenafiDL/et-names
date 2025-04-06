import { Name } from "@prisma/client";

export type NameWithNicknames = Name & {
  nicknames: {
    nickname: {
      nickname: string;
    };
  }[];
};
