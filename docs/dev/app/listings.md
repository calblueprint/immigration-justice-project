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

### `ListingCard` 
- ListingCard renders each listing card, containing the condensed listing information.

### `ListingDetails`
- ListingDetails displays the details of a selected listing. If the user is logged in and onboarded, the ProfileMatch and InterestForm appear. Otherwise, the Profilematch and InterestForm will be replaced by buttons directing the user to log in and complete onboarding.
- To display the fields underneath "Highlights", an instance of the `ListingFields` component is used. For nullable fields, if a listing field is null/undefined, the field will appear as "Not Available." However, some fields are non-nullable.

### `ProfileMatch`
- For a logged in and onboarded user, `ProfileMatch` indicates aspects of their profile meet the requirements of a listing.
- `matchIcon` conditionally renders the match icon based on the value of the argument, `match`, of type `boolean | undefined`. If `match` is undefined, the `grayDot` icon is returned, indicating that the listing does not include information about a given field. 
- `renderIconGroup` renders the icon and text for a match-field. It takes in the argument `fields` of type `MatchField`. However, for fields that require the `yellowExclaimation` icon, `renderIconGroup` is not used. 
    - The `yellowExclaimation` icon indicates that the user's data does not match a listing's details, but it is not a strict requirement. In particular, `yellowExclaimation` is used when an attorney does not match the language for the case.

### `InterestForm`
- For a logged in and onboarded user, `InterestForm` enables a user to submit an interest for the current listing. This interest is saved in the `interests` table. 
- `handleInsert` is used to handle the insertion of the user's responses to the interest form into the `interests table`. After error-checking that all required fields (according to listing type) are valid and filled out, the user's responses are upserted. If the a user submits multiple forms for one case, only the most recent response will be saved on the `interests` table.

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