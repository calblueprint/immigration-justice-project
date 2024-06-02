---
icon: briefcase
---

# LegalServer

[LegalServer](https://www.legalserver.org) is a web-based case management software used by the Immigration Justice Project (IJP) to find open pro bono case opportunities. We've integrated IJP's instance of LegalServer into our project to pull limited, anonymous data about active cases. This data is displayed to volunteer attorneys and interpreters on the *Cases* and *Language Support* pages.

Click [here](LEGALSERVER USE PUBLISHED NOTION DOC) for more information about Blueprint's use of LegalServer.


## Data Retrieved

The project leverages LegalServer's [Reports API](https://help.legalserver.org/article/1751-reports-api) to pull and store the necessary information from each case. The report does **not** include any identifying information about the client—- no names, no contact details, no A-Number, etc. The summary is intentionally written by IJP staff to only use client initials and contain no identifying information at all. The following fields are retrieved from LegalServer using the Reports API:

- `id` **→** LegalServer case ID
- `matter_builtin_lookup_case_disposition_case...` **→** case disposition 
- `matter_builtin_lookup_case_status_case...` **→** case status 
- `matter_builtin_lookup_problem_code...` **→** relief(s) sought
- `person_builtin_lookup_language...` **→** language(s)
- `city` **→** current city the client lives in 
- `state` **→** current state the client lives in
- `matter_builtin_lookup_country_country_of_origin_expn` **→** client’s country of origin
- `person_builtin_lookup_living_arrangement...` **→** living arrangement (ex. “Immigration detention”)
- `custom_custom_matter_custom_lookup_c9222481eaa6062f0b243da18f9add22_expn` **→** current living location, Loren, current custody location (in detention center, shelter, etc.)
- `pb_opportunity_summary` **→** case summary
- `pb_opportunity_note` **→** case title
- `interpreter_needed` **→** helps determine if a case needs a volunteer interpreter
- `custom_custom_matter_custom_lookup_b6a226e574a50b6849998214b82e3570_expn` **→** adjudicating agency 

## Updating Case Data

Given that we cannot make edits directly to LegalServer data, admin must make sure consistently maintain the cases data on LegalServer. Admin should be updating the fields listed above when necessary to ensure that there are as few missing or incorrect fields as possible for each case. 

::: warning Important
Fields with missing data will be presented to volunteers as "To Be Determined"/"TBD" or "Not Available."
:::

In particular, admin should ensure the Case Status and Disposition fields have the correct values so that pro bono case opportunities are displayed to the correct user groups. For more information about how we display cases to volunteers, please refer to the [Cases Displayed to Volunteers](legalserver.md#cases-displayed-to-volunteers) section below.

Ensuring the accuracy of case data on LegalServer is vital for the project's longevity and for providing volunteers with reliable and consistent opportunities.

## Cases Displayed to Volunteers

To help determine which cases are shown to volunteers, we use LegalServer's Disposition and Case Status fields. Currently, we consider cases with a Disposition field set to "Open" or "Pending" as seeking a volunteer attorney and/or interpreter.

::: tip Terminology
Both attorneys and interpreters can volunteer for open pro bono case opportunities. When cases are are displayed on the Cases page, we often refer to them as cases or case listings. If they are displayed on the Language Support page, we may refer to them as case interpretations or case interpretation listings.
:::

### Cases Displayed to Attorneys

A case has been assigned a volunteer attorney if its Disposition field is "Open", and its Case Status field is "Working". Thus, cases with these field values will *not* be displayed to volunteers on the *Cases* page.


### Cases Displayed to Interpreters

A case is considered in need of an interpreter when its `interpreter_needed` field is set to true or has no value assigned LegalServer. Otherwise, if the `interpreter_needed` field is set to false, the case will *not* be displayed to volunteers on the *Language Support* page.


Click [here](https://help.legalserver.org/article/1632-disposition-and-case-status-compared) for more information about LegalServer's Disposition and Case Status fields.

## Time Commitment Mapping

Case listings for attorneys and interpreters currently have a **time commitment** field, which estimates the time an attorney is expected to volunteer for the given case. For interpreters, the time commitment is roughly the same but may be shorter. 

Currently, we use the type of relief sought and whether the client is detained to approximate the amount of time an attorney is expected to volunteer for. Here is a map showing how we're currently determing the time commitment field:

- **client in removal proceedings and seeking asylum** → 40-50 hrs per month for 6 months
- **not detained and in removal proceedings** → 20-30 hrs for 12 months
- **detained & seeking asylum** → 40 hrs a month for 6 month
- **not detained and seeking asylum** → 10-15 hrs a month for 12 months
- **custody & seeking release for parole** → 10-15 hrs for 2 weeks
- **custody seeking bond help** → 15-20 hrs over course of 3 weeks

::: warning
If no data is found for the type of relief sought or whether the client is detained, the time commitment field will be displayed as "To Be Determined" to volunteers.
:::

### How to Update the Mapping

The time commitment mapping is implemented in a Retool Workflow that syncs the project's database with the cases data from LegalServer. For more information on Retool Workflows, refer to the developer documentation for Retool.

## Helpful Links

- [LegalServer Website](https://help.legalserver.org)
- [LegalServer Documentation](https://apidocs.legalserver.org)
- [Case Disposition vs. Case Status](https://help.legalserver.org/article/1632-disposition-and-case-status-compared)
- [Reports API Documentation](https://help.legalserver.org/article/1751-reports-api)
- [Blueprint's Use of LegalServer]()