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

export type NameQueryResult = {
  data: NameWithNicknames[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
