---
prev: /dev/retool/
---

# Admin Dashboard

Much of the admin dashboard is built with basic Retool components, the use of which can be better explained by the official [Retool component library](https://retool.com/components) and [Retool documentation](https://docs.retool.com/). Thus, we'll only cover the parts that we custom configured in order to provide the desired functionality.

## Custom Resources

We configured a few custom resources to help connect Retool with the application database provided by Supabase and gain limited read access to Legal Server.

**`immigration-justice-project`** (PostgreSQL)

This resource is used to read data from the application database and fetch information such as listings, interest applications, and user profiles.

**`IJP Supabase Service`** (REST API)

This resource connects to the application database with a REST API using the secret service key. This is used to edit or remove an existing listing or interest application, and its inputs should **never be exposed** directly to the user. More information about how to use this can be found in the [Retool Workflow](/dev/retool/workflow) page.

**`Legal Server`** (REST API)

This resource simply fetches the available listings on Legal Server, and is only used in the daily syncing of the cases information stored in the application database with what is on Legal Server.

## Implementing Code & API

To help each view in the admin dashboard achieve its goal, we made custom JavaScript code, SQL commands, REST API calls, and Retool Workflows to be triggered for separate events. We can't cover all of them individually as there are too many, but we can discuss the basic concept.

### JavaScript Transformer

Often times, we use JavaScript to turn one value into another. For example, formatting a JavaScript `Date` object into a human-readable date string. Retool provides a tool called a "Transformer", which is essentially a cached result of the processed value to be used as a variable anywhere else. This means we only have to compute once and use many times, and the logic for processing is stored in one place.

![Example of a transformer](/assets/image/transformer.png)

### SQL Commands

A SQL resource (like [`immigration-justice-project`](#custom-resources)) can be referenced using SQL commands, the result of which will be cached until we tell it to re-validate. Similar to transformers, this allows us to fetch once and use the result many times in components like tables.

### Importing Retool Workflow

Retool workflows allow us to easily chain together code and SQL commands to execute many events using one trigger. This is often useful when working with a relational database like our application database, which keeps join tables and therefore requires multiple inserts at once.

In the admin dashboard, workflow imports are often used to add or modify listings, as the information for each listing is segmented into join tables in the application database.

For more information, check out the page on [Retool Workflow](/dev/retool/workflow).
