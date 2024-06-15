# Listing Portals

Similar to the client-facing app, the Admin Dashboard has 3 main portals for listings: **Cases Portal**, 
**Limited Case Assignments Portal**, and the **Language Support Portal**.
In these listing portals, admin can browse through relevant listings, create new listings, as well as edit and delete existing listings. 

![Language Support Portal](/assets/image/retool-listing-page.png) 

At the very least, each listing portal contains a table (on the left) displaying all listings currently visible to volunteers, alongside a container (on the right) to view the information relevant to the selected listing. 

Below is an outline regarding which portals the listings pertain to on the admin dashboard:
- **Cases Portal**
    - Cases 
    - Case Interpretations 
- **Limited Case Assignments Portal**
    - Limited Case Assignments
- **Language Support Portal**
    - One-Time Interpretations
    - Document Translations

::: warning 
    On the client application, Case Interpretation listings are found under the Language
    Support page not the Cases page.

    It is also important to remember that Case and Case Interpretation listings are both 
    retrieved from the cases data on LegalServer.
:::

## Browsing Listings 

In all listing portals, admin have the ability to view listings that are currently stored in the project's database and are visible to volunteers.

![cases portal](/assets/image/retool-browsing-cases.png)

To browse listings, admins can scroll through the table on the left, where each row corresponds to a listing. The table provides limited information about the listings, helping admins identify which listing to examine further. Clicking on a row displays all the available information for that listing in the container to the right of the table.

For more information on how to update which fields are visible in each of the listing tables, please refer to the [developer documentation](../dev/retool.md) for the Retool Admin Dashboard.

### Cases Portal

Since all data for case listings is stored on LegalServer, admins are limited to only browsing case listings on the Retool Admin Dashboard.
All other actions must be performed on LegalServer, but admins can sync the database with LegalServer using the "Sync" button at the bottom of the table.
 
![sync button for case listings](/assets/image/retool-sync-cases.png)

### Language Support Portal

The Language Support Portal features both One-Time Interpretation and Document Translation listings. 
In this portal, admin can use the "One-Time Interpretations" and "Document Translations" tabs to toggle between 
the two listing types.

![browsing document translation listings](/assets/image/retool-browse-ls.png)



## Creating Listings 
::: info Note:
Case-Specific listings cannot be created through the Retool Admin Dashboard. Case-Specific listings should be created on LegalServer.
Refer to the [LegalServer admin documentation](legalserver.md) for more information regarding LegalServer and Case-Specific listings. 
:::

To create a listing, you will need to access the form in the tabbed container. Clicking on the "Create New" tab will allow you to access the form to create a new listing. Once all of the information has been input, clicking on the "Create New Listing" button at the bottom of the form should upload the listing to the database, making it visuble to volunteers.

![creating a new limited case assignment listing](/assets/image/retool-create-listing.png) 


After creating a new listing, it should appear in the corresponding listing table. If the listing is not visible on the table, refresh the table by clicking on the circular arrow at the bottom right corner.


 

## Editing Listings 

::: info Note:
Case-Specific listings cannot be edited through the Retool Admin Dashboard. Case-Specific listings should be updated on LegalServer.
Refer to the [LegalServer admin documentation](legalserver.md) for more information regarding LegalServer and Case-Specific listings.
:::

Similarly, to edit a listing, you will need to access the form in the tabbed container. Clicking on the "Edit" tab will allow you to access the form to edit an existing listing. Once all edits have been made, clicking on the "Update Listing" button at the bottom of the form should upload the listing to the database, making all edits visible to the volunteers.

![editing a limited case assignment listing](/assets/image/retool-edit-listing.png) 


After editing a listing, the edits should reflect in the corresponding listing table. If the edits are not reflected in the table, refresh the the table by clicking on the circular arrow at the bottom right corner.

## Deleting Listings 

::: info Note:
Case-Specific listings cannot be deleted through the Retool Admin Dashboard. Case-Specific listings should be updated on LegalServer.
Refer to the [LegalServer admin documentation](legalserver.md) for more information regarding LegalServer and Case-Specific listings.
:::

To delete a listing, you will need to access the form in the tabbed container. To delete a listing, click on the "Edit" tab. Near the bottom of the edit form, you can find a red "Delete Listing" button. **Clicking this button will delete the selected listing along with all user-submitted interests for volunteering.**

![deleting a limited case assignment listing](/assets/image/retool-edit-listing.png) 


::: warning
After deleting a listing, there will be no way to revert this action. The listing and its corresponding interest submissions will be permanently deleted!
:::