
import type { nftType } from "../domain/types/types";

export interface FilterOptions {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "expiration" | "title" | "none";
  sortOrder?: "asc" | "desc";
}


function parseEthPrice(priceString: string): number {
  const match = priceString.match(/(\d+\.?\d*)/);
  return match && match[1] ? parseFloat(match[1]) : 0;
}

function parseExpirationDays(expireString: string): number {
  const match = expireString.match(/(\d+)\s*days?/);
  return match && match[1] ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}


export function filterBySearch(
  nfts: nftType[],
  query: string
): nftType[] {
  if (!query.trim()) {
    return nfts;
  }

  const lowerQuery = query.toLowerCase();

  return nfts.filter(
    (nft) =>
      nft.title.toLowerCase().includes(lowerQuery) ||
      nft.description.toLowerCase().includes(lowerQuery) ||
      nft.creator.toLowerCase().includes(lowerQuery)
  );
}

// filtre par prix les nfts
export function filterByPrice(
  nfts: nftType[],
  minPrice?: number,
  maxPrice?: number
): nftType[] {
  return nfts.filter((nft) => {
    const price = parseEthPrice(nft.price);

    if (minPrice !== undefined && price < minPrice) {
      return false;
    }

    if (maxPrice !== undefined && price > maxPrice) {
      return false;
    }

    return true;
  });
}

// filtre par les dates
export function filterByExpiration(
  nfts: nftType[],
  maxDaysLeft: number
): nftType[] {
  return nfts.filter((nft) => {
    const daysLeft = parseExpirationDays(nft.expire);
    return daysLeft <= maxDaysLeft;
  });
}

// filtre par les critères
export function sortNFTs(
  nfts: nftType[],
  sortBy: "price" | "expiration" | "title",
  order: "asc" | "desc" = "asc"
): nftType[] {
  const sorted = [...nfts];
  const multiplier = order === "asc" ? 1 : -1;

  switch (sortBy) {
    case "price":
      return sorted.sort(
        (a, b) =>
          (parseEthPrice(a.price) - parseEthPrice(b.price)) * multiplier
      );

    case "expiration":
      return sorted.sort(
        (a, b) =>
          (parseExpirationDays(a.expire) - parseExpirationDays(b.expire)) *
          multiplier
      );

    case "title":
      return sorted.sort((a, b) =>
        (a.title.localeCompare(b.title) * multiplier)
      );

    default:
      return sorted;
  }
}

// filtre par filtre précis
export function filterNFTs(
  nfts: nftType[],
  options: FilterOptions
): nftType[] {
  let filtered = [...nfts];


  if (options.search) {
    filtered = filterBySearch(filtered, options.search);
  }


  if (options.minPrice !== undefined || options.maxPrice !== undefined) {
    filtered = filterByPrice(
      filtered,
      options.minPrice,
      options.maxPrice
    );
  }

  if (options.sortBy && options.sortBy !== "none") {
    filtered = sortNFTs(filtered, options.sortBy, options.sortOrder || "asc");
  }

  return filtered;
}
