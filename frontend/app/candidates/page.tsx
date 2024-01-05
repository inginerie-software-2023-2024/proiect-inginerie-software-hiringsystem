"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { PaginationComponent } from "@/components/pagination/Pagination";

const CandidateRow = ({ candidate, mutatePages, mutateCandidates }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteCandidate = async () => {
    setIsDeleting(true);

    await fetch(`/api/candidates/delete/${candidate.id}`, {
      method: "POST",
    });

    mutatePages();
    mutateCandidates();
    setIsDeleting(false);
  };

  return (
    <TableRow>
      <TableCell>{candidate.primaryEmail}</TableCell>
      <TableCell>
        {candidate.firstName} {candidate.lastName}
      </TableCell>
      <TableCell>
        <Link href={`/profile/candidate/${candidate.id}`}>View</Link>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            disabled={isDeleting}
            variant="outline"
            onClick={deleteCandidate}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const CandidatesManagement = () => {
  const searchParams = useSearchParams();

  const {
    data: pages,
    isLoading: isLoadingPages,
    mutate: mutatePages,
  } = useSWR("/api/candidates/pages", (url: string) =>
    fetch(url).then((r) => r.json())
  );

  const page = (() => {
    const toReturn = parseInt(searchParams.get("page") || "1") || 1;
    if (pages < toReturn) return pages;
    return toReturn;
  })();

  const {
    data: candidates,
    isLoading: isLoadingCandidates,
    mutate: mutateCandidates,
  } = useSWR(`/api/candidates/get/${page}`, (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Candidates Management</h1>
          <Button>Create Candidate</Button>
        </div>
        <div className="overflow-x-auto">
          <Table className="mb-5 w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoadingCandidates &&
                candidates?.map((candidate) => (
                  <CandidateRow
                    key={candidate.id}
                    candidate={candidate}
                    mutateCandidates={mutateCandidates}
                    mutatePages={mutatePages}
                  />
                ))}
            </TableBody>
          </Table>

          {!isLoadingPages && <PaginationComponent page={page} pages={pages} />}
        </div>
      </div>
    </div>
  );
};

export default CandidatesManagement;
