import { Name, User } from "@prisma/client";

export type NameWithNicknames = Name & {
  nicknames: {
    nickname: {
      nickname: string;
    };
  }[];
  _count?: {
    likes?: number;
  };
  addedBy?: User | null;
};

export type tParams = Promise<{ slug: string[] }>;
