import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function getPagesDisplayed(page: number, pages: number) {
  const toReturn: number[] = [];

  if (page === 1) {
    toReturn.push(1);
    toReturn.push(2);
  } else if (page === pages) {
    toReturn.push(pages - 1);
    toReturn.push(pages);
  } else {
    toReturn.push(page - 1);
    toReturn.push(page);
    toReturn.push(page + 1);
  }

  if (toReturn[0] !== 1) {
    if (toReturn[0] !== 2) {
      toReturn.unshift(-1);
    }
    toReturn.unshift(1);
  }

  if (toReturn[toReturn.length - 1] !== pages) {
    if (toReturn[toReturn.length - 1] !== pages - 1) {
      toReturn.push(-1);
    }
    toReturn.push(pages);
  }

  return toReturn;
}

export function PaginationComponent({
  page,
  pages,
}: {
  page: number;
  pages: number;
}) {
  if (pages <= 4)
    return (
      <Pagination>
        <PaginationContent>
          {page !== 1 && <PaginationPrevious href={`?page=${page - 1}`} />}
          {[...Array(pages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href={`?page=${i + 1}`} isActive={i + 1 === page}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page !== pages && <PaginationNext href={`?page=${page + 1}`} />}
        </PaginationContent>
      </Pagination>
    );

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && <PaginationPrevious href={`?page=${page - 1}`} />}

        {getPagesDisplayed(page, pages).map((i, index) => (
          <PaginationItem key={index}>
            {i === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={`?page=${i}`} isActive={i === page}>
                {i}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {page !== pages && <PaginationNext href={`?page=${page + 1}`} />}
      </PaginationContent>
    </Pagination>
  );
}
