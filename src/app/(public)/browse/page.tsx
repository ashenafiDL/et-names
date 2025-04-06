"use client";

import { getAllNames } from "@/actions/names/actions";
import Container from "@/components/container";
import NameCard from "@/components/name-card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NameWithNicknames } from "@/lib/utils/types";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

interface PaginationState {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

function Browse() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [names, setNames] = useState<NameWithNicknames[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 9,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState<"name" | "likes" | "createdAt">(
    "likes",
  );
  const [gender, setGender] = useState<"all" | "MALE" | "FEMALE" | "UNISEX">(
    "all",
  );

  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();
    params.set("page", pagination.currentPage.toString());
    params.set("limit", pagination.pageSize.toString());
    if (searchTerm) params.set("search", searchTerm);
    if (orderBy) params.set("sort", orderBy);
    if (gender) params.set("gender", gender);
    router.replace(`?${params.toString()}`);
  }, [
    pagination.currentPage,
    pagination.pageSize,
    searchTerm,
    router,
    orderBy,
    gender,
  ]);

  const updatePage = (page: number) =>
    setPagination((prev) => ({ ...prev, currentPage: page }));

  const fetchData = useCallback(async () => {
    try {
      const result = await getAllNames(
        pagination.currentPage,
        pagination.pageSize,
        searchTerm,
        orderBy,
        gender,
      );

      if (result) {
        setNames(result.data);
        setPagination((prev) => ({
          ...prev,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
        }));
      }
    } catch {
      setNames([]);
    }
  }, [
    pagination.currentPage,
    pagination.pageSize,
    searchTerm,
    orderBy,
    gender,
  ]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);
    const search = searchParams.get("search") || "";

    setPagination((prev) => ({
      ...prev,
      currentPage: page,
      pageSize: limit,
    }));
    setSearchTerm(search);
  }, [searchParams]);

  useEffect(() => {
    updateUrlParams();
    fetchData();
  }, [
    pagination.currentPage,
    pagination.pageSize,
    searchTerm,
    updateUrlParams,
    fetchData,
    gender,
  ]);

  const renderPageNumbers = () => {
    const items = [];
    const { totalPages, currentPage } = pagination;
    const maxVisible = 5;

    const addPage = (page: number) =>
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            isActive={currentPage === page}
            onClick={() => updatePage(page)}
            className="cursor-pointer"
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      );

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) addPage(i);
    } else {
      addPage(1);
      if (currentPage > 3) items.push(<PaginationEllipsis key="start" />);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) addPage(i);
      if (currentPage < totalPages - 2)
        items.push(<PaginationEllipsis key="end" />);
      addPage(totalPages);
    }

    return items;
  };

  return (
    <Container>
      <div className="py-12">
        <h1 className="mb-2 text-3xl font-bold">Browse Names</h1>
        <p className="text-muted-foreground mb-8">
          Explore our collection of Ethiopian names
        </p>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              className="pl-10"
              value={searchTerm}
              placeholder="Search names..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                updatePage(1); // Reset to first page on new search
              }}
            />
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Sort by:</p>
            <Tabs
              defaultValue="likes"
              onValueChange={(value) =>
                setOrderBy(value as "name" | "likes" | "createdAt")
              }
            >
              <TabsList>
                <TabsTrigger value="likes">Most Popular</TabsTrigger>
                <TabsTrigger value="createdAt">Recently Added</TabsTrigger>
                <TabsTrigger value="name">Alphabetical</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Filters:</p>
            <Select
              defaultValue={gender}
              onValueChange={(value) =>
                setGender(value as "all" | "MALE" | "FEMALE" | "UNISEX")
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="UNISEX">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {names.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {names.map((name, index) => (
              <NameCard key={index} name={name} />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground w-full text-center">
            There are no names. Try adjusting your filters.
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>{renderPageNumbers()}</PaginationContent>
          </Pagination>
        </div>
      </div>
    </Container>
  );
}

export default function BrowsePage() {
  return (
    <Suspense>
      <Browse />
    </Suspense>
  );
}
