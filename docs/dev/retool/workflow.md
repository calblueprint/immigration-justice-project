# Retool Workflow

[Retool workflows](https://retool.com/products/workflows) are great for automated tasks that need to be run on intervals. For our project, we use Retool workflows to routinely sync our database with LegalServer every day. Additionally, we take advantage of Retool workflows to create function abstractions that chain REST APIs to create, edit, or delete listings (i.e. limited case assignments) via the Retool application.

## LegalServer Sync

To get data from LegalServer, we added the provided API link as a REST API resource.
After fetching data from LegalServer using said resource, we processed it as follows:

1. Filter to only cases seeking volunteers
2. Search legal problem code for keywords (i.e. asylum)
3. Determine time commitment based on the case's relief sought code and whether the client is detained
4. Upsert cases and relevant languages and relief codes to Supabase
5. Delete old stored cases that do not match what's stored in LegalServer

## Other Workflows

As mentioned, we also take advantage of Retool workflows to create function abstractions that chain REST APIs to create, edit, or delete listings in the admin dashboard. All of the following are already in use by the admin dashboard.

### Add Document Translation

This workflow creates a new document translation listing based on the following parameters:

- `deadline`: **`timestamp`**

  A timestamp string to represent the deadline. Can be `YYYY-MM-DD` or timezone specific.

- `numpages`: **`number`**

  The number of pages for the document.

- `docLanguages`: **`string[]`**

  The required languages for the translation.

- `documentTitle`: **`string`**

  The title of the document or listing.

- `docSummary`: **`string`**

  A summary for the document or listing.

### Add One-Time Interpretation

This workflow creates a new one-time interpretation listing based on the following parameters:

- `title`: **`string`**

  The title for the listing.

- `summary`: **`string`**

  A summary for the listing.

- `isRemote`: **`boolean`**

  An indicator of whether the listing is remote or in person.

- `languages`: **`string[]`**

  A list of languages the interpreter should know for the listing.

### Add LCA

This workflow creates a new limited case assignment listing based on the following parameters:

- `title`: **`string`**

  The title of the assignment or listing.

- `summary`: **`string`**

  A summary for the assignment or listing.

- `deliverableType`: **`string`**

  The type of deliverable.

- `country`: **`string`**

  The relevant country for the assignment.

- `deadline`: **`timestamp`**

  A timestamp string to represent the deadline.
  Can be `YYYY-MM-DD` or timezone specific.

- `researchTopic`: **`string`**

  The research topic for the assignment.

### Edits

The listing-adding workflows above each has a corresponding workflow to edit the respective listing type. The only added parameter is the `id`: **`uuid`** of the listing.

## Supabase REST API

::: warning
The Supabase REST API resource on Retool (titled IJP Supabase Service) uses the service key, which can bypass row level protection. NEVER expose this directly to the user.
:::

We use this API to make requests to Supabase such as inserting, deleting, and modifying data.
For example, in syncing to LegalServer, we need to use this resource to upsert (insert, or update if it already exists) the cases data that we fetched from LegalServer.

Here's a general framework for the REST API:

```text:no-line-numbers
URL: .../v1/<table_name>
Headers:
    apiKey: --hidden--
    Authorization: --hidden--
    Content-Type: application/json
```

### INSERT

To make an INSERT operation, make a POST request with the framework above. You can use the IJP Supabase Service resource and simply edit the URL to include the desired table name. Then, put the data you want to insert in the body of the request.

![Example HTTP request to perform an INSERT operation](/assets/image/example_insert_operation.png)

### UPSERT

To make an UPSERT operation (INSERT, but UPDATE if it already exists), do the same as INSERT (instructions above), but add a header:

```text:no-line-numbers
Prefer: resolution=merge-duplicates
```

By default, UPSERT detects duplicates based on the primary key.
To specify additional columns to detect conflicts on, add a URL query parameter `on_conflict`.
For example:

```text:no-line-numbers
URL: .../v1/<table_name>?on_conflict=<column_name>
```

![Example HTTP request to perform an UPSERT operation](/assets/image/example_upsert_operation.png)

### DELETE

To make a DELETE operation, make a DELETE request using the general framework with the desired table name. Then, set the WHERE clause in the URL query parameter to indicate what rows to delete.
For example:

```text:no-line-numbers
URL: .../v1/<table_name>?<column_name>=<filter>.<value>
```

![Example HTTP request to perform a DELETE operation](/assets/image/example_delete_operation.png)

### More Resources

For more information, refer to the official Supabase documentations on [creating REST API routes](https://supabase.com/docs/guides/api/creating-routes). Another tool that may be helpful is the [official SQL to REST API Translator](https://supabase.com/docs/guides/api/sql-to-rest) provided by Supabase.

Another helpful way to figure out how to structure your REST API call is to structure your action using the [JavaScript client library](https://supabase.com/docs/reference/javascript/start), then view the network requests the library makes using the network tab in your browser dev tools.
