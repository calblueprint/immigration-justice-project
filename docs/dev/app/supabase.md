---
next: /dev/retool
---

# Supabase

Supabase is an open source Firebase alternative that provides many services, among which we use the [PostgreSQL](https://www.postgresql.org/) database, authentication, and convenient APIs to access its services.

## Database Schema

The schema describes how data relates to each other in the database.
You can find the most up-to-date schema by navigating to the Database tab in the leftmost sidebar, then going to Schema Visualizer in the second sidebar.

## Database Functions

We use [database functions](https://supabase.com/docs/guides/database/functions) to simplify SQL queries.

`get_cases`

This function fetches all cases, each joined with the corresponding language requirements and relief codes sought, both aggregated in an array of their own.

`get_document_translations`

This function fetches all document translation listings, each joined with the corresponding language requirements aggregated in an array.

`get_interpretations`

This function fetches all one-off interpretation listings, each joined with the corresponding language requirements aggregated in an array.

`get_lca`

This function fetches all limited case assignments, each joined with the corresponding language requirements aggregated in an array.

`check_email_exists`

This function takes in an email and returns whether or not that email has already been registered.

`verify_user_password`

This function takes a plaintext password and checks whether the hashed password matches the requesting client's stored hashed password.

`delete_interests_of_listing`

This function is used by triggers to delete interest applications associated with a given listing when that listing is deleted.

## Database Triggers

[Database triggers](https://supabase.com/docs/guides/database/postgres/triggers) are used to listen for events in the database, such as deleting a row from a table.

Currently, we employ triggers to listen for any deleted listings in cases, document translation, (one-off) interpretation, and limited case assignments. When any listing is deleted, the corresponding trigger will call `delete_interests_of_listing`, which will drop any interest applications associated with that listing.
