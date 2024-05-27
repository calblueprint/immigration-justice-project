---
icon: wrench
---

# Retool

[Retool Link](https://abaijp.retool.com/apps/fe259556-7ac6-11ee-a31b-6fa060fbb72b/Case%20Portal)
This page will serve as a guide for how to utilize the Retool Admin Dashboard. 
For information regarding how to make edits to the dashboard, please refer the developer documentation for Retool.

## Navigating the Admin Dashboard

The main purpose of this dashboard is to give admin the ability to review listings, submitted interests from volunteers, and registered user accounts.
The admin dashboard consists of 5 total pages, that you can navigate to using the navbar pictured below:

![retool navigation bar](/assets/image/retool-navbar.png)

### Page Overviews
 
- **Cases Portal**: This page features listings for case-specific listings, including case representation and case interpretation. Admin can browse through case listings, and sync the database with the cases data from LegalServer.
    - *Relevant Sections: [Browsing Listings](retool.md#browsing-listings)*
- **Limited Case Assignments Portal**: This page features listings for One-Time Interpretations and Document Translation. Admin can browse, edit, delete, and create language support listings.
    - *Relevant Sections: [Browsing Listings](retool.md#browsing-listings), [Editing Listings](retool.md#editing-listings), 
    [Creating Listings](retool.md#creating-listings), and [Deleting Listings](retool.md#deleting-listings)*
- **Language Support Portal**: This page features listings for limited case assignments. Admin can browse, edit, delete, and create limited case assignment listings. 
    - *Relevant Sections: [Browsing Listings](retool.md#browsing-listings), [Editing Listings](retool.md#editing-listings), 
    [Creating Listings](retool.md#creating-listings), and [Deleting Listings](retool.md#deleting-listings)*
- **Interests Portal**: This page 
    - *Relevant Sections: [Reviewing Interests](retool.md#reviewing-interests)*
- **Users Directory**: This page features a directory of all users with a registered accounts.
    - *Relevant Sections: [Users Directory](retool.md#users-directory)*

Each page on the admin dashboard also features a brief description and information on how to use it.

## Listing Portals 

Similar to the client app, the Admin Dashboard has 3 main portals for listings: **Cases Portal**, 
**Limited Case Assignments Portal**, and the **Language Support Portal**.
In these listing portals, admin can browse through relevant listings, create new listings, as well as edit and delete existing listings. 

Here is an outline which portals the listings pertain to on the admin dashboard:
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

Below is an example of the structure of a listing portal:

![Language Support Portal](/assets/image/retool-listing-page.png) 

At the very least, each listing portal contains a table (on the left) displaying all listings currently visible to volunteers, alongside a container (on the right) to view the information relevant to the selected listing. 

### Browsing Listings 

In all listing portals, admin have the ability to view listings that are currently stored in the project's database and are visible to volunteers.

![cases portal](/assets/image/retool-browsing-cases.png)

To browse listings, admins can scroll through the table on the left, where each row corresponds to a listing. The table provides limited information about the listings, helping admins identify which listing to examine further. Clicking on a row displays all the available information for that listing in the container to the right of the table.

For more information on how to update which fields are visible in each of the listing tables, please refer to the developer documentation for the Retool admin dashboard.

#### Cases Portal

Since all data for case listings is stored on LegalServer, admins are limited to only browsing case listings on the Retool admin dashboard.
All other actions must be performed on LegalServer, but admins can sync the database with LegalServer using the "Sync" button at the bottom of the table.
 
![sync button for case listings](/assets/image/retool-sync-cases.png)

#### Language Support Portal

The Language Support Portal features both One-Time Interpretation and Document Translation listings. 
In this portal, admin can use the "One-Time Interpretations" and "Document Translations" tabs to toggle between 
the two listing types.

![browsing document translation listings](/assets/image/retool-browse-ls.png)



### Creating Listings 
::: info Note:
Case-Specific listings cannot be created through the Retool Admin Dashboard. Case-Specific listings should be created on LegalServer.
Refer to this page for more information regarding LegalServer and Case-Specific listings. 
<!-- Link to the Retool developer documentation! -->
:::

To create a listing, you will need to access the form in the tabbed container. Clicking on the "Create New" tab will allow you to access the form to create a new listing. Once all of the information has been input, clicking on the "Create New Listing" button at the bottom of the form should upload the listing to the database, making it visuble to volunteers.

![creating a new limited case assignment listing](/assets/image/retool-create-listing.png) 


After creating a new listing, it should appear in the corresponding listing table. If the listing is not visible on the table, refresh the table by clicking on the circular arrow at the bottom right corner.


 

### Editing Listings 

::: info Note:
Case-Specific listings cannot be edited through the Retool Admin Dashboard. Case-Specific listings should be updated on LegalServer.
Refer to this page for more information regarding LegalServer and Case-Specific listings.
<!-- Link to the Retool developer documentation! -->
:::

Similarly, to edit a listing, you will need to access the form in the tabbed container. Clicking on the "Edit" tab will allow you to access the form to edit an existing listing. Once all edits have been made, clicking on the "Update Listing" button at the bottom of the form should upload the listing to the database, making all edits visible to the volunteers.

![creating a limited case assignment listing](/assets/image/retool-edit-listing.png) 


After editing a listing, the edits should reflect in the corresponding listing table. If the edits are not reflected in the table, refresh the the table by clicking on the circular arrow at the bottom right corner.

### Deleting Listings 

::: info Note:
Case-Specific listings cannot be deleted through the Retool Admin Dashboard. Case-Specific listings should be updated on LegalServer.
Refer to this page for more information regarding LegalServer and Case-Specific listings.
<!-- Link to the Retool developer documentation! -->
:::

To delete a listing, you will need to access the form in the tabbed container. To delete a listing, click on the "Edit" tab. Near the bottom of the edit form, you can find a red "Delete Listing" button. **Clicking this button will delete the selected listing along with all user-submitted interests for volunteering.**

![deleting a limited case assignment listing](/assets/image/retool-edit-listing.png) 


::: warning
    After deleting a listing, there will be no way to revert this action. The listing and 
    its corresponding interest submissions will be permanently deleted!
:::

## Reviewing Interests

To review interets, navigate to the Interets Portal through the navbar. On this page, admin can choose the listing type they want to review interests for by selecting either the "Cases", "Limited Case Assignments", or "Language Support" tabs. 

The interest portal features 3 main components:
- A horizontal scrollview that displays all case, limited case assignment, or language support listings.
- A table with interests corresponding to the listing selected from the scrollview.
- A container where the applicants contact information and response to the interest form is displayed.

![reviewing language support interests](/assets/image/retool-interests.png) 

Clicking on a listing from the horizontal scroll view will filter the table to display only the interests submitted for that listing. To view the details of a user's application and their information, admins can click on the desired listing in the table.



## Users Directory

This directory contains user profiles with information such as names, contact details, roles, and other relevant attributes. Admins can browse through the table, where each row represents a user profile. Clicking on a row will display the associated user information in the container to the left of the table.

![reviewing registered users](/assets/image/retool-users.png) 
