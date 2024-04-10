'use client';

import { useState } from 'react';
import type { Listing } from '@/types/schema';
import COLORS from '@/styles/colors';
import { CenteredH3, H1 } from '@/styles/text';
import FilterDropdown from '../FilterDropdown';
import * as Styles from './styles';
import ListingCard from '../ListingCard';

interface Filter {
  id: string;
  options: Set<string> | Map<string, string>;
  placeholder: string;
  value: Set<string>;
  onChange: (newValue: Set<string>) => void;
  fullText?: string;
}

export default function ListingPage({
  filters,
  resetFilters,
  filteredListings,
  defaultListing,
}: {
  filters: Filter[];
  resetFilters: () => void;
  filteredListings: Listing[];
  defaultListing?: Listing;
}) {
  const [selectedCard, setSelectedCard] = useState<string | null>(
    defaultListing ? defaultListing.id : null,
  );
  const [listingInfo, setListingInfo] = useState<Listing | null>(
    defaultListing ?? null,
  );

  return (
    <Styles.PageContainer>
      <Styles.Header>
        <Styles.FiltersContainer>
          {filters.map(filter => (
            <FilterDropdown
              key={filter.id}
              multi
              placeholder={filter.placeholder}
              options={filter.options}
              value={filter.value}
              fullText={filter.fullText}
              onChange={filter.onChange}
            />
          ))}
          <Styles.ResetFilters onClick={resetFilters}>
            Reset Filters
          </Styles.ResetFilters>
        </Styles.FiltersContainer>
      </Styles.Header>
      <Styles.ListingDisplay>
        <Styles.CardColumn>
          <Styles.ListingCount $color={COLORS.greyMid}>
            {filteredListings.length} listings found
          </Styles.ListingCount>
          {filteredListings.length === 0 ? (
            <CenteredH3 $color={COLORS.greyMid}>No listings found</CenteredH3>
          ) : (
            <>
              {filteredListings.map(listing => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  isSelected={listing.id === selectedCard}
                  onClick={() => {
                    setSelectedCard(listing.id);
                    setListingInfo(listing);
                  }}
                />
              ))}
            </>
          )}
        </Styles.CardColumn>
        <Styles.ListingDetailsContainer>
          {listingInfo ? (
            <>Listing Details</>
          ) : (
            <Styles.NoListingsContainer>
              <H1 $color={COLORS.greyMid}>No listings found</H1>
              <CenteredH3 $color={COLORS.greyMid}>
                Check back later for more listings
              </CenteredH3>
            </Styles.NoListingsContainer>
          )}
        </Styles.ListingDetailsContainer>
      </Styles.ListingDisplay>
    </Styles.PageContainer>
  );
}
