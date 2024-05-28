# Listing Pages

All three listing pages contain a filter bar at the top, a scrollable list of Listing Cards on the left, and the Listing Details of the currently selected listing card on the right. 

## Components
**Components Used**
- `ListingPage`
    - `ListingCard` 
    - `ListingDetails`
        - `ProfileMatch`
        - `InterestForm`

### `ListingPage`
- The listing pages are all instances of `ListingPage`. The ListingPage contains a scrollable list of ListingCards on the left, and the ListingDetails of the currently selected listing card on the right. 

#### How to Create a New ListingPage
Here is an an example implementation of the ListingPage component, roughly based on the LCA page. `filter1` is used as a stand-in for a generic filter. By specifying a ListingType, a new ListingPage can be created for any listing type. 
```
import { useState, useMemo, useCallback } from 'react';
import ListingPage from '@/components/ListingPage';
import { Listing, ListingType } from '@/types/schema'; // replace ListingType with desired listing type 
// import database query function 

function Page() {
    const [listingData, setListingData] = useState<ListingType[]>([]);
    const [filter1Filters, setFilter1Filters] = useState(new Set<string>());
    const [languageFilters, setLanguageFilters] = useState(new Set<string>());
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

    // load listing data 
    useEffect(
        () => {
            // get data using database query function
            // ... 
            // setListingData(data) 
         }, []
    )

    // update filter1Options based on listingData
    const filter1Options = useMemo(
        () => {...} // get filter options from listingData 
        [listingData],
    );

    // update languageOptions (filter options) based on listingData
    const languageOptions = useMemo(
        () => new Set(listingData.flatMap(listing => listing.languages)),
        [listingData],
    );

    // update filteredListings based on filter options  
    const filteredListings = useMemo( () => {...},
        [listingData, filter1Filters, languageFilters]
    )

    // set selectedListing based on filteredLCA
    useEffect(() => {
        setSelectedListing(filteredListings.length > 0 ? filteredListings[0] : null);
    }, [filteredListings]);

    // define resetFilters function to clear all filters 
    const resetFilters = useCallback(() => {
        setFilter1Filters(new Set());
        setLanguageFilters(new Set());
    }, []);

    return (
        <ListingPage 
            filters= {[
                {
                    id: 'filter1',
                    options: filter1Options,
                    value: filter1Filters,
                    onChange: newValue => setFilter1Filters(newValue),
                    placeholder: 'Filter1',
                },
                {
                    id: 'languages',
                    options: languageOptions,
                    value: languageFilters,
                    onChange: newValue => setLanguageFilters(newValue),
                    placeholder: 'Language(s)',
                },
            ]}
            resetFilters={resetFilters}
            filteredListings={filteredListings}
            selectedListing={selectedListing}
            setSelectedListing={lisitng => setSelectedListing(listing)}
            interpretation
        />
    );
}
```

**ListingPage Parameters**

ListingPage component has the following arguments with the following types: 
- `filters`: *Filter[]*. A list of filters (see following section on customizing filters). Each filter in the list creates a new dropdown filter button. 
- `resetFilters`: *() => void*. A no-argument function that clears all filters, triggered when "Reset Filters" is clicked. 
- `filteredListings`: *Listing[]*. A list of listings, filtered by the currenlty selected filter options. This should be a memoized constant dependent on selected filters and listing data. 
- `selectedListing`: *Listing | null*. The currently selected listing whose ListingDetails will be displayed and whose ListingCard will be highlighted. In the above example, the defualt `selectedListin` is the first item of the `filteredListings` if one exists. 
- `setSelectedListing`: *(listing: Listing | null) => void*. Of the form `lisitng => setSelectedListing(listing)` as above, this function is used to set/update the selectedListing when it changes, i.e. when the user clicks on a new listing. 
-  (optional)`interpretation`: *boolean*. Default value, false. A boolean specifying whether the current listing page is for interpretations or not. Used to differentiate between CaseInterpretations and Cases. 

#### Customizing Filters 
It is possible to modify the display of the existing filters or add/delete fitlers of listing pages by modifying the argument passed into the `filters` parameter of the `ListingPage` component.

Filters must be of the following custom type:
```
interface Filter {
  id: string;
  options: Set<string> | Map<string, string>;
  display-text (value) is different, i.e. longer, from the stored string (key) 
  placeholder: string;
  value: Set<string>;
  onChange: (newValue: Set<string>) => void; 
  fullText?: string;
}
```

**Fields of a Filter**
- `id`: unique identifier of the filter's dropwdown button
- `options`: All options for a given filter that a user can select from (derived from the listing data). This can be a map or a set. A map is used when you want the options' display-text to be different from the stored-text. For the map, keys are the actual values stored, and values are the displayed value
- `placeholder`: The placeholder display text on the filter dropdown when no values of the current filter are selected. 
- `value`: The selected values of the filter. This should be tracked as a state in the main component, and its corresponding setState function should be passed into `onChange` below.
- `onChange`: Usually of the form `newValue => setFieldFilters(newValue)`. This function is called when the values of the filter dropdown is changed, i.e. when the user selects/deselects a value of a the current filter. 
- (optional) `fullText` (!! not sure?)

### `ListingCard` 
- ListingCard renders each listing card, containing the condensed listing information.

### `ListingDetails`
- ListingDetails displays the details of a selected listing. If the user is logged in and onboarded, the ProfileMatch and InterestForm appear. Otherwise, the Profilematch and InterestForm will be replaced by buttons directing the user to log in and complete onboarding.
- To display the fields underneath "Highlights", an instance of the `ListingFields` component is used. For nullable fields, if a listing field is null/undefined, the field will appear as "Not Available." However, some fields are non-nullable.

#### How to Customize Fields In ListingDetails 

#### How to Change Icons 

### `ProfileMatch`
- For a logged in and onboarded user, `ProfileMatch` indicates aspects of their profile meet the requirements of a listing.
- `matchIcon` conditionally renders the match icon based on the value of the argument, `match`, of type `boolean | undefined`. If `match` is undefined, the `grayDot` icon is returned, indicating that the listing does not include information about a given field. 
- `renderIconGroup` renders the icon and text for a match-field. It takes in the argument `fields` of type `MatchField`. However, for fields that require the `yellowExclaimation` icon, `renderIconGroup` is not used. 
    - The `yellowExclaimation` icon indicates that the user's data does not match a listing's details, but it is not a strict requirement. In particular, `yellowExclaimation` is used when an attorney does not match the language for the case.

#### How to Customize ProfileMatch Fields 

### `InterestForm`
- For a logged in and onboarded user, `InterestForm` enables a user to submit an interest for the current listing. This interest is saved in the `interests` table. 
- `handleInsert` is used to handle the insertion of the user's responses to the interest form into the `interests table`. After error-checking that all required fields (according to listing type) are valid and filled out, the user's responses are upserted. If the a user submits multiple forms for one case, only the most recent response will be saved on the `interests` table.

#### How to Customize InterestForm Questions 

## Cases
### Frontend
- Filters
    - Remote/In Person
    - Languages
    - Adjudicating Agency
    - Country of Origin
- Listing Detail Display
    - **Case Title**
        - Next Court/Filing Date 
    - **Highlights**
        - Relief Sought
        - Time Commitment 
        - Remote/In Person
        - Adjudicating Agency
        - Client Language(s)
        - Client Country of Origin
        - Client Location / Custody Location
            - If the client is in custody (`is_detained`, pulled from LegalServer, is `true`), this field appears as Custody Location. Otherwise, it appears as Client Location.
    - **Description**
### Backend
- `getAllCases` queries the database to retrieve all Case listings from the `cases`, `cases-languages`,`cases-reliefs` tables. 

## Limited Case Assignments
### Frontend
- Filters 
    - Country Field
    - Language(s)
- Listing Detail Display
    - **Title**
        - Deadline
    - **Highlights**
        - Country
        - Language(s)
        - Expected Deliverable
    - **Description**
    - **Research Topic**
### Backend
- `getAllLCA` queries the database to retrieve all Limited Case Assignment listings from the `limited_case_assignments`, `lca-languages` tables.
## Language Support
- Filters 
    - Listing Type
    - Language(s)

### Backend
- `getAllDocuments` queries the database to retrieve all Document Translation listings from the `document_translation`, `document_translation-languages` tables. 
- `getAllInterpretation` queries the database to retrieve all Interpretation listings from the `interpretation`, `interpretation-languages` tables. 
- `getAllCases` queries the database to retrieve all Case listings from the `cases`, `cases-languages`,`cases-reliefs` tables. 
    - The cases are filtered (by `needs_interepreter`) so that only the Case Interpretations are left.

### Document Translation
Listing Detail Display
- **Title**
    - Deadline 
- **Highlights**
    - Language(s)
    - Number of Pages
- **Description**
### One-time Interpretation
Listing Detail Display
- **Title**
- **Highlights**
    - Language(s)
    - Remote/In Person
- **Description**

### Case Interpretation
Listing Detail Display
- **Title**
    - Next Court/Hearing Date 
- **Highlights**
    - Language(s)
    - Time Commitment 
    - Remote/In Person
- **Description**