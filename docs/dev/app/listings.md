# Listing Pages

All three listing pages contain a filter bar at the top, a scrollable list of Listing Cards on the left, and the Listing Details of the currently selected listing card on the right. Differences in display between listing pages are listed below. Then, the usage and functionality of components used to bulid the listing pages are explained. 

## Listing Page Comparison 

<style>
table th:first-of-type {
    width: 15%;
}
table th:nth-of-type(2) {
    width: 30%;
}
table th:nth-of-type(3) {
    width: 25%;
}
table th:nth-of-type(4) {
    width: 25%;
}
</style>

| Listing Page | Case | Limited Case Assignments | Language Support |
|:------------:|------|--------------------------|------------------|
| Filters | <ol><li>Remote/In Person</li><li>Languages</li><li>Adjudicating Agency</li><li>Country of Origin</li></ol> | <ol><li>Country Field</li><li>Language(s)</li></ol> | <ol><li>Listing Type</li><li>Language(s)</li></ol> | <ol><li>Listing Type</li><li>Language(s)</li></ol> | <ol><li>Listing Type</li><li>Language(s)</li></ol> |
| Listing Highlights | <ol><li>Relief sought</li><li>Time Commitment</li><li>Remote/In Person</li><li>Adjudicating Agency</li><li>Client Languages</li><li>Client Country of Origin</li><li>__*__ Client Location</li></ol> | <ol><li>Country Field</li><li>Language(s)</li><li>Expected Deliverable</li></ol> | **DOC** <ol><li>Language(s)</li><li>Number of Pages</li></ol> **CASE_INT** <ol><li>Language(s)</li><li>Time Commitment</li><li> Remote/In Person </li></ol> **INT** <ol><li>Language(s) </li><li>Remote/In Person</li></ol> |

::: note (*) Note: 
If the client is in custody (i.e., `is_detained`, pulled from LegalServer, is `true`), "Client Location" appears as "Custody Location." Otherwise, it remains as Client Location.
::: 

## **Components Used**

- `ListingPage`
    - `FilterDropdown`
    - `ListingCard` 
    - `ListingDetails`
        - `ProfileMatch`
        - `InterestForm`

![ListingPage Component Structure](/assets/image/listing_page_components.png)

## `ListingPage`

**Description**

The listing pages are all instances of `ListingPage`. The ListingPage contains an array of filters as the header, a scrollable list of ListingCards on the left, and the ListingDetails of the currently selected listing card on the right.

**ListingPage Props**

ListingPage component has the following arguments with the following types: 
- `filters`: **`Filter[]`**

    A list of filters (see following section on customizing filters). Each filter in the list creates a new dropdown filter button. 

- `resetFilters`: **`() => void`**

    A no-argument function that clears all filters, triggered when "Reset Filters" is clicked. 

- `filteredListings`: **`Listing[]`**
    
    A list of listings, filtered by the currenlty selected filter options. This should be a memoized constant dependent on selected filters and listing data. 

- `selectedListing`: **`Listing | null`**

    The currently selected listing whose ListingDetails will be displayed and whose ListingCard will be highlighted. In the above example, the defualt `selectedListing` is the first item of the `filteredListings` if one exists. 

- `setSelectedListing`: **`(listing: Listing | null) => void`**

    Of the form `lisitng => setSelectedListing(listing)` as above, this function is used to set/update the selectedListing when it changes, i.e. when the user clicks on a new listing. 

-  (optional)`interpretation`: **`boolean`**

    Default value, false. A boolean specifying whether the current listing page is for interpretations or not. Used to differentiate between CaseInterpretations and Cases. 

### Create a New ListingPage

See the codebase for an implementation example of a listing page, using the `ListingPage` component. The `limited-case-assignments` page may be the most straightforward example. 

## `FilterDropdown`

**Description**

`FilterDropdown` is the dropdown button used for filters. When clicked, the dropdown reveals the options for the filter. The user can select filter option(s), which are used to filter the listings displayed on the page. 

**FilterDropdown Props**

- `options`: **`Set<string> | Map<string, string>`**

   All options for a given filter that a user can select from (derived from the listing data). This can be a map or a set. A map is used when you want the options' display-text to be different from the stored-text. If a map is used, the keys are the actual values stored, while values are the displayed value.

- `multi`: **`boolean`**

    Specifies whether the dropdown should be multi-select. (If `multi` is false, the dropdown button will be single-select.) In the `ListingPage` component, `multi` is specified as true for all `FilterDropdown`s.

- `placeholder`: **`string`**

   The placeholder display text on the filter dropdown when no values of the current filter are selected.

- `value`: **`Set<string>`**

   The selected values of the filter. This should be tracked as a state in the main component, and its corresponding setState function should be passed into `onChange` below.

- `onChange`: **`(newValue: Set<string>) => void`**
  
   Usually of the form `newValue => setFieldFilters(newValue)`. This function is called when the values of the filter dropdown is changed, i.e. when the user selects/deselects a value of the current filter.

- (optional) `fullText`: **`string`**
  
   A string that is the default display name of the filter dropdown button. Currently, this is only used for the "Remote/In Person" filter.

::: note
The `FilterDropdown` component can create either single-select or multi-select buttons. However, on the listing pages, all `FilterDropdown` instances are specified to be multi-select. Additionally, for the purpose of adding a filter button to the listing pages, you do not have to directly create any new `FilterDropdown` instances; you only have to modify the `filters` prop of `ListingPages`. Each object in the `filters` array will be mapped into `FilterDropdown` instances.
:::

### Customizing Filters of a ListingPage

It is possible to modify the display of the existing filters or add/delete fitlers of listing pages by modifying the argument passed into the `filters` prop of the `ListingPage` component. The `filters` prop must be of type `Filter[]`, i.e. an array of `Filter`'s. The fields of the custom type `Filter` are defined below. See any of the listing pages in the code base for an example implementation. 

```ts:no-line-numbers
interface Filter {
  id: string;
  options: Set<string> | Map<string, string>;
  placeholder: string;
  value: Set<string>;
  onChange: (newValue: Set<string>) => void;
  fullText?: string;
}
```

The fields of the `Filter` interface include all the props of the `FilterDropdown` component, as well as an additional `id` field, which is the unique identifier of the filter's dropdown button. Additionally, since the `FilterDropdown` instaces are mulit-select by default, there is no field for `multi`.

**Adding a New Filter** 

Below is an example of adding a new filter called `filter1`, whose options are `string`s. 
1. Create a new state to track the filter's selected values. 
    - Make sure to reset the filter's state in the `resetFilters` function.
```ts:no-line-numbers
const [filter1Filters, setFilter1Filters] = useState(new Set<string>());
// ... 
const resetFilters = useCallback(() => {
    setFilter1Filters(new Set());
    // reset other filters ... 
}, []);
```
2. Define the filter's possible options. 
    - Many of the filters in the codebase use `useMemo` with a dependency on `listingData` since the filter options (e.g. for langauges) are dependent on the options from listings. 
```ts:no-line-numbers
 const filter1Options = useMemo(
        () => {...} // get filter options from listingData 
        [listingData],
    );
```
3. Update `filteredListings` by adding an additional filter for the current filter's values. 
``` tsx:no-line-numbers
const filteredListings = useMemo( 
    () => {...}, 
    // see codebase for example of filtering based on selected filter values 
    [listingData, filter1Filters, ...] 
    // all filter-states should be included as dependencies
)
```
4. Add a new `Filter` object to the array of the `filters` prop. 
``` tsx:no-line-numbers
 <ListingPage 
    filters={[
        {
            id: 'filter1',
            options: filter1Options,
            value: filter1Filters,
            onChange: newValue => setFilter1Filters(newValue),
            placeholder: 'Filter1',
        },
        // other filters ... 
    ]}
    // other props 
/>
```

## `ListingCard` 

**Description**

ListingCard renders each listing card, containing the condensed listing information. 

**ListingCard Props**

- `listing`: **`Listing`**

    The listing whose ListingCard will be rendered. The rendering of fields is dependent on the `listing_type` of `listing`. 

- (optional) `isSelected`: **`boolean`**
    
    Default value: false. If true, the card will be highlighted. 

- (optional) `onClick`: **`(id: UUID) => void`**

    An additional event handler triggered when the ListingCard is clicked. 

- (optional) `interpretation`: **`boolean`**

    Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**

- Langauge Support listings: 
``` tsx:no-line-numbers
<ListingCard listing={listingData} isSelected={isSelected} interpretation />
```
- Non-Langauge Support listings: 
``` tsx:no-line-numbers
<ListingCard listing={listingData} isSelected={isSelected} />
```

## `ListingDetails`

**Description**

`ListingDetails` displays the details of a selected listing. If the user is logged in and onboarded, the ProfileMatch and InterestForm appear. Otherwise, the Profilematch and InterestForm will be replaced by buttons directing the user to log in or complete onboarding.

- To display the fields underneath "Highlights", an instance of the `ListingFields` component is used. For nullable fields, if a listing field is null/undefined, the field will appear as "Not Available." However, some fields are non-nullable.

**ListingDetails Props**

- `listingData`: **`Listing`**

    The listing whose ListingDetails will be rendered. The rendering of fields is dependent on the `listing_type` of `listingData`. 

- (optional) `interpretation`: **`boolean`**
    
    Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**

- Langauge Support listings: 
``` tsx:no-line-numbers
<ListingDetails listingData={listingData} interpretation />
```
- Non-Langauge Support listings: 
``` tsx:no-line-numbers
<ListingDetails listingData={listingData} />
```

### How to Customize Fields In ListingDetails 

**For Existing Listing Types**

To customize fields for existing listing types, modify the array of fields for the corresponding listing type. 
- Cases: `caseFields`
- Case Interpretation: `caseInterpretationFields`
- Interpretation: `interpretationFields`
- Document Translation: `docFields`
- Limited Case Assignments: `lcaFields`

All fields are of type `ListingField<T>[]` (i.e. an array of `ListingField`s), where `ListingField` is defined below: 

```ts:no-line-numbers
interface ListingField<T extends Listing> {
  label: string;
  getValue: (data: T) => string;
}
```

For example, below is how you would add a new field to `lcaFields`. Note that the order of the array determines the order that the fields are rendered. 

```ts:no-line-numbers
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

**For a New Listing Type**

- Create a a new array of fields of type `ListingField<NewListingType>[]`, where `NewListingType` is a placeholder for the actual listing type.  
```ts:no-line-numbers
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
```
- Add a type check to ensure that `listingFields` returns the fields for your desired listing. 
```tsx:no-line-numbers
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

## `ProfileMatch`

**Description**

For a logged in and onboarded user, `ProfileMatch` indicates aspects of their profile meet the requirements of a listing. For a not logged in and onboarded user, `ProfileMatch` will not render. 

- `matchIcon` conditionally renders the match icon based on the value of the argument, `match`, of type `boolean | undefined`. If `match` is undefined, the `grayDot` icon is returned, indicating that the listing does not include information about a given field. 
- `renderIconGroup` renders the icon and text for a match-field. It takes in the argument `fields` of type `MatchField`. However, for fields that require the `yellowExclaimation` icon, `renderIconGroup` is not used. 
    - The `yellowExclaimation` icon indicates that the user's data does not match a listing's details, but it is not a strict requirement. In particular, `yellowExclaimation` is used when an attorney does not match the language for the case.

**ProfileMatch Props**

- `listingData`: **`Listing`**

    The listing whose ProfileMatch will be rendered. The rendering of fields is dependent on the `listing_type` of `listingData`. 

- (optional) `interpretation`: **`boolean`**

    Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**

- Langauge Support listings: 
``` tsx:no-line-numbers
<ProfileMatch listingData={listingData} interpretation />
```
- Non-Langauge Support listings: 
``` tsx:no-line-numbers
<ProfileMatch listingData={listingData} />
```

### How to Customize ProfileMatch Fields

The easiest way to create a new profile match field is to create a new constant of type `MatchField` as defined below. 
```ts:no-line-numbers
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
``` tsx:no-line-numbers
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

## `InterestForm`

**Description**

For a logged in and onboarded user, `InterestForm` enables a user to submit an interest for the current listing. This interest is saved in the `interests` table. For a not logged in and onboarded user, `InterestForm` will not render. 

- `handleInsert` is used to handle the insertion of the user's responses to the interest form into the `interests table`. After error-checking that all required fields (according to listing type) are valid and filled out, the user's responses are upserted. If the a user submits multiple forms for one case, only the most recent response will be saved on the `interests` table.

**InterestForm Props**

- `listingData`: **`Listing`**

    The listing whose InterestForm will be rendered. The rendering of fields is dependent on the `listing_type` of `listingData`. 

- (optional) `interpretation`: **`boolean`**
    
    Default value: false. Should be `true` for Langauge Support listings. Used to distinguish between Case Interpretations and Cases. 

**Example Usage**

- Langauge Support listings: 
``` tsx:no-line-numbers
<InterestForm listingData={listingData} interpretation />
```
- Non-Langauge Support listings: 
``` tsx:no-line-numbers
<InterestForm listingData={listingData} />
```

### How to Customize InterestForm Questions 

**Creating a New Question**

1. Create a new Input Component and a new state to track the input. Update useEffect to reset the state when listingData changes. 
```ts:no-line-numbers
const [newState, setNewState] = useState('');
// other states ... 

useEffect(() => {
    // (1) Reset form fields when caseData changes
    setNewState('');
    // reset other states ... 
}, [listingData]);
```
2. Add a new field to the `Responses` type, corresponding to this new input 
``` tsx:no-line-numbers
interface Responses {
  start_date?: Date;
  needs_interpreter?: boolean;
  interest_reason: string;
  // (2) add new fields as necessary here
}
```
3. In `handleInsert`, add an error check if this new field is required for certain listing types 

4. In `handleInsert`, conditionally add the new input to `responses` to be inserted into supabase

**Existing Questions**

| Question | Case | Limited Case Assignments | Document Translation | Case Interpretation | One-Time Interpretation |
|----|:----:|:----:|:----:|:----:|:----:|
| What is the earliest date you can contact the client? | ✅ **Required** | | | ✅ **Required** | ✅ **Required** | 
| Do you need language interpretation help for the client?  | ✅ **Required** | | | | |
| Why are you interested in this case? | ✅ Optional | ✅ **Required** | ✅ **Required** | ✅ Optional | ✅ Optional | 