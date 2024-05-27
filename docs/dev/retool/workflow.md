# Retool Workflow

[Retool workflows](https://retool.com/products/workflows) are great for automated tasks that need to be run on intervals. For our project, we use Retool workflows to routinely sync our database with Legal Server every day. Additionally, we take advantage of Retool workflows to create function abstractions that chain REST APIs to create, edit, or delete listings (i.e. limited case assignments) via the Retool application.

## Legal Server Sync

To get data from Legal Server, we added the provided API link as a REST API resource.
After fetching data from Legal Server using said resource, we processed it as follows:

1. Filter to only open cases
2. Search legal problem code for keywords (i.e. asylum)
3. Determine time commitment by legal problems
4. Upsert cases and relevant languages and relief codes to Supabase
5. Delete old stored cases that do not match what's stored in Legal Server

## Supabase REST API

::: warning
The Supabase REST API resource on Retool (titled IJP Supabase Service) uses the service key, which can bypass row level protection. NEVER expose this directly to the user.
:::

We use this API to make requests to Supabase such as inserting, deleting, and modifying data.
For example, in syncing to Legal Server, we need to use this resource to upsert (insert, or update if it already exists) the cases data that we fetched from Legal Server.

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
