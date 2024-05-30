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

::: tip Description
The listing pages are all instances of `ListingPage`. The ListingPage contains an array of filters as the header, a scrollable list of ListingCards on the left, and the ListingDetails of the currently selected listing card on the right.
:::

**ListingPage Props**

ListingPage component has the following arguments with the following types: 
- `filters`: *Filter[]*

    A list of filters (see following section on customizing filters). Each filter in the list creates a new dropdown filter button. 

- `resetFilters`: *() => void*

    A no-argument function that clears all filters, triggered when "Reset Filters" is clicked. 

- `filteredListings`: *Listing[]*
    
    A list of listings, filtered by the currenlty selected filter options. This should be a memoized constant dependent on selected filters and listing data. 

- `selectedListing`: *Listing | null*

    The currently selected listing whose ListingDetails will be displayed and whose ListingCard will be highlighted. In the above example, the defualt `selectedListing` is the first item of the `filteredListings` if one exists. 

- `setSelectedListing`: *(listing: Listing | null) => void*

    Of the form `lisitng => setSelectedListing(listing)` as above, this function is used to set/update the selectedListing when it changes, i.e. when the user clicks on a new listing. 

-  (optional)`interpretation`: *boolean*

    Default value, false. A boolean specifying whether the current listing page is for interpretations or not. Used to differentiate between CaseInterpretations and Cases. 

#### How to Create a New ListingPage

Here is an an example implementation of the ListingPage component, roughly based on the LCA page. `filter1` is used as a stand-in for a generic filter. By specifying a ListingType, a new ListingPage can be created for any listing type. 

``` tsx
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
    const filteredListings = useMemo( 
        () => {...},
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

#### Customizing Filters 

It is possible to modify the display of the existing filters or add/delete fitlers of listing pages by modifying the argument passed into the `filters` prop of the `ListingPage` component. The `filters` prop must be of type `Filter[]`, i.e. an arra of `Filter`s. The fields of the custom type `Filter` are defined below and are also defined in the `ListingPage` codebase. 

**Fields of a Filter**

- `id`: unique identifier of the filter's dropwdown button
- `options`: All options for a given filter that a user can select from (derived from the listing data). This can be a map or a set. A map is used when you want the options' display-text to be different from the stored-text. For the map, keys are the actual values stored, and values are the displayed value
- `placeholder`: The placeholder display text on the filter dropdown when no values of the current filter are selected. 
- `value`: The selected values of the filter. This should be tracked as a state in the main component, and its corresponding setState function should be passed into `onChange` below.
- `onChange`: Usually of the form `newValue => setFieldFilters(newValue)`. This function is called when the values of the filter dropdown is changed, i.e. when the user selects/deselects a value of a the current filter. 
- (optional) `fullText`: A string that is the default display name of the filter dropdown button. Currenlty, this is only used for the "Remote/In Person" filter. 

### `ListingCard` 

::: tip Description
ListingCard renders each listing card, containing the condensed listing information.
:::

**ListingCard Props**

- `listing`: *Listing*. The listing whose ListingCard will be rendered. The rendering of fields is dependent on the `listing_type` of `listing`. 
- (optional) `isSelected`: *boolean*. Default value: false. If true, the card will be highlighted. 
- (optional) `onClick`: *(id: UUID) => void*. An additional event handler triggered when the ListingCard is clicked. 
- (optional) `interpretation`: *boolean*. Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**

- Langauge Support listings: `<ListingCard listing={listingData} isSelected={isSelected} interpretation />`
- Non-Langauge Support listings: `<ListingCard listing={listingData} isSelected={isSelected} />`

### `ListingDetails`
::: tip Description
`ListingDetails` displays the details of a selected listing. If the user is logged in and onboarded, the ProfileMatch and InterestForm appear. Otherwise, the Profilematch and InterestForm will be replaced by buttons directing the user to log in and complete onboarding.
:::

- To display the fields underneath "Highlights", an instance of the `ListingFields` component is used. For nullable fields, if a listing field is null/undefined, the field will appear as "Not Available." However, some fields are non-nullable.

**ListingDetails Props**

- `listingData`: *Listing*. The listing whose ListingDetails will be rendered. The rendering of fields is dependent on the `listing_type` of `listingData`. 
- (optional) `interpretation`: *boolean*. Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**

- Langauge Support listings: `<ListingDetails listingData={listingData} interpretation />`
- Non-Langauge Support listings: `<ListingDetails listingData={listingData} />`

#### How to Customize Fields In ListingDetails 

**Customizing Fields for Existing Listing Types (i.e. LCA, Language Support or Cases)**

All fields are of type `ListingField<T>[]` (i.e. an array of `ListingField`s), where `ListingField` is defined below: 

``` ts
interface ListingField<T extends Listing> {
  label: string;
  getValue: (data: T) => string;
}
```

To customize fields for existing listing types, modify the array of fields for the corresponding listing type. 
- Cases: `caseFields`
- Case Interpretation: `caseInterpretationFields`
- Interpretation: `interpretationFields`
- Document Translation: `docFields`
- Limited Case Assignments: `lcaFields`

For example, below is how you would add a new field to `lcaFields`. Note that the order of the array determines the order that the fields are rendered. 

``` ts
const lcaFields: ListingField<LimitedCaseAssignment>[] = [
    // existing fields ...
    
    // New field 
    {
        label: 'New Field',
        getValue: data => data.newfield, 
        // a function that takes data (type: LimitedCaseAssignments) 
        // and returns the value of the New Field 
    },
];
```

**Customize Fields for a New Listing Type**

- Create a a new array of fields of type `ListingField<NewListingType>[]`,where `NewListingType` is a placeholder for the actual listing type.  
- Add a type check to ensure that `listingFields` returns the fields for your desired listing. 
``` tsx
const newListingFields: ListingField<NewListingType>[] = [
    // example field 
    {
        label: 'New Field',
        getValue: data => data.newfield, 
        // a function that takes data (type: NewListingType) 
        // and returns the value of the New Field 
    },
    // ... other fields 
];

// ... 

export default function ListingDetails( ... ) {
    // ... 
    const listingFields = useMemo(() => {
        if (listingData.listing_type === 'NewListingType') {
            return (
                <ListingFields
                    fields={newListingFields}
                    listingData={listingData}
                />
            )
        }
        // ... handling of other listing types
    }, [listingData, interpretation]);

    // ... 
}
```

### `ProfileMatch`
::: tip Description
For a logged in and onboarded user, `ProfileMatch` indicates aspects of their profile meet the requirements of a listing. For a not logged in and onboarded user, `ProfileMatch` will not render. 
::: 

- `matchIcon` conditionally renders the match icon based on the value of the argument, `match`, of type `boolean | undefined`. If `match` is undefined, the `grayDot` icon is returned, indicating that the listing does not include information about a given field. 
- `renderIconGroup` renders the icon and text for a match-field. It takes in the argument `fields` of type `MatchField`. However, for fields that require the `yellowExclaimation` icon, `renderIconGroup` is not used. 
    - The `yellowExclaimation` icon indicates that the user's data does not match a listing's details, but it is not a strict requirement. In particular, `yellowExclaimation` is used when an attorney does not match the language for the case.

**ProfileMatch Props**
- `listingData`: *Listing*. 

    The listing whose ProfileMatch will be rendered. The rendering of fields is dependent on the `listing_type` of `listingData`. 

- (optional) `interpretation`: *boolean*. 

    Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**

- Langauge Support listings: `<ProfileMatch listingData={listingData} interpretation />`
- Non-Langauge Support listings: `<ProfileMatch listingData={listingData} />`

#### How to Customize ProfileMatch Fields

The easiest way to create a new profile match field is to create a new constant of type `MatchField` as defined below. 
```ts
interface MatchField<T extends Listing> {
  getMatch: (data: T, profileData: Profile) => boolean | undefined;
  getText: (
    data: T,
    profileData: Profile,
    match: boolean | undefined,
  ) => string;
}
```
- `getMatch`: takes in the listing `data` and `profileData`, and returns whether the user's information match's the listing's requirements. Returns undefined if current listing does not have information for the current field. The returned value determines the matchIcon (handled in `renderIconGroup`) and the value of getText.
- `getText`: takes in the listing `data`, `profiledata`, and `match` (from `getMatch` above). Returns a string of what should be displayed next to the icon. 

Then, call `renderIconGroup` on the match field, as below: 
```tsx
const newFieldMatch: MatchField<NewListingType> = {
    getMatch: (data, profileData) => some_boolean_or_undefined_value
    getText: (data, profileData, match) => some_text
};

export default function ProfileMatch(...) {
    return (
        <Flex $direction="column" $gap="16px" $h="100%" $maxW="40%">
            <H3>Profile Match</H3>
            {renderIconGroup(newFieldMatch as MatchField<Listing>)}
            {/* other match fields */}
        </Flex>
}
```

### `InterestForm`
::: tip Description
For a logged in and onboarded user, `InterestForm` enables a user to submit an interest for the current listing. This interest is saved in the `interests` table. For a not logged in and onboarded user, `InterestForm` will not render. 
::: 

- `handleInsert` is used to handle the insertion of the user's responses to the interest form into the `interests table`. After error-checking that all required fields (according to listing type) are valid and filled out, the user's responses are upserted. If the a user submits multiple forms for one case, only the most recent response will be saved on the `interests` table.

**InterestForm Props**
- `listingData`: *Listing*. The listing whose InterestForm will be rendered. The rendering of fields is dependent on the `listing_type` of `listingData`. 
- (optional) `interpretation`: *boolean*. Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**
- Langauge Support listings: `<InterestForm listingData={listingData} interpretation />`
- Non-Langauge Support listings: `<InterestForm listingData={listingData} />`

#### How to Customize InterestForm Questions 
**Creating a New Question**
1. Create a new Input Component and a new state to track the input. Update useEffect to reset the state when listingData changes. 
2. Add a new field to the `Responses` type, corresponding to this new input 
3. In `handleInsert`, add an error check if this new field is required for certain listing types 
4. In `handleInsert`, conditionally add the new input to `responses` to be inserted into supabase

```tsx
interface Responses {
  start_date?: Date;
  needs_interpreter?: boolean;
  interest_reason: string;
  // (2) add new fields as necessary 
}

export default function InterestForm( ... ) {
    const [newState, setNewState] = useState('');
    // other states ... 
    
    useEffect(() => {
        // (1) Reset form fields when caseData changes
        setNewState('');
        // reset other states ... 
    }, [listingData]);

    const handleInsert = async () => {
        // Error handling, check if required fields are unfilled.
        if (
            // other conditional checks ... 
            other-checks
            // (3) new error handling check 
            || newState === ''
        ) {
            setMissingInfo(true);
            return;
        }

        const responses: Responses = { interest_reason: '' };
        if (auth && auth.userId) {
            // (4) conditionally add newState to responses
            const newInterest: Interest = {
            listing_id: listingData.id,
            listing_type:
                listingData.listing_type === 'CASE' && interpretation
                    ? 'CASE_INT'
                    : listingData.listing_type,
                user_id: auth.userId,
                form_response: responses,
            };
            await upsertInterest(newInterest);
        }
    }

    return (
        <Styles.FormContainer>
            <H3>Submit Interest</H3>
            {submitted ? (
                <Styles.EmptySpace>
                    <P>Your submission has been received!</P>
                </Styles.EmptySpace>
            ) : (
                <Flex $gap="30px" $direction="column">
                    {/* (1) New Interest Question Input*/}
                    {/*... Existing Questions*/}
                </Flex>
    )
}
```

## Cases
- Note: If the client is in custody (i.e., `is_detained`, pulled from LegalServer, is `true`), "Client Location" appears as "Custody Location." Otherwise, it remains as Client Location.

- `getAllCases` queries the database to retrieve all Case listings from the `cases`, `cases-languages`,`cases-reliefs` tables. 

## Limited Case Assignments

- `getAllLCA` queries the database to retrieve all Limited Case Assignment listings from the `limited_case_assignments`, `lca-languages` tables.
## Language Support

- `getAllDocuments` queries the database to retrieve all Document Translation listings from the `document_translation`, `document_translation-languages` tables. 
- `getAllInterpretation` queries the database to retrieve all Interpretation listings from the `interpretation`, `interpretation-languages` tables. 
- `getAllCases` queries the database to retrieve all Case listings from the `cases`, `cases-languages`,`cases-reliefs` tables. 
    - The cases are filtered (by `needs_interepreter`) so that only the Case Interpretations are left.

### Document Translation

### One-time Interpretation

### Case Interpretation
