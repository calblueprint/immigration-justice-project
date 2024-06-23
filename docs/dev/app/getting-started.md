# Getting Started

See the [homepage]() for an introduction to the project.

## Setup

1. **Pre-requisites**

    You should have [npm](https://www.npmjs.com/) (Node Package Manager) and [Node](https://nodejs.org/en) (version 18 or higher) installed.

2. **Clone the repository**

    Clone the [Repo](https://github.com/calblueprint/immigration-justice-project/) on GitHub using `git clone`:

    ```bash:no-line-numbers
    git clone https://github.com/calblueprint/immigration-justice-project/
    ```

    Then install dependencies:

    ```bash:no-line-numbers
    npm install
    ```

3. **Add environment keys**

    In the root directory, add the file `.env.local` and add the keys:

    - `NEXT_PUBLIC_SUPABASE_URL`: The project URL of the Supabase project
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key of the Supabase project

    Both of these values can be found in project settings, in the API tab.

## Contributing

### Development lifecycle
Feel free to skip this section if you already have experience with any of the following.

### Creating Pull Requests (PRs)

To keep the working commit history clean, we create branches for each feature and add a PR to merge that feature into main once we're finished. Importantly, we use squash and merge, which compresses all changes made in that feature branch into one commit and adds it onto the main branch.

The pull request template can be found in `.github/pull_request_template.md`.

### GitHub Actions

Every time a push is made to the repo or when a PR is created, a GitHub action will trigger to run ESLint, Prettier, and the Typescript compiler to ensure the code can be safely merged into the main branch.

The description for the action can be found in `.github/workflows/lint.yml`.

### Node Scripts

There is a variety of helpful scripts located in `package.json`, each of which can be executed on the terminal by using the command `npm run [command name]`.

Here is a list of all the commands:

-   `dev`: runs the application locally for development
-   `build`: builds the application for deployment
-   `start`: runs the application locally in deployment mode
-   `lint:check`: runs ESLint to check for code quality
-   `lint:fix`: automatically fixes lint issues
-   `prettier:check`: runs Prettier to check for code cleanliness
-   `prettier:fix`: automatically fixes Prettier issues
-   `tsc`: runs Typescript compiler to check for compiler errors

### Directory structure

When adding to the repo, try to adhere to the current structure, although these are just general guidelines. There will always be exceptional cases, so use your best judgment as to whether to (and where to) create new files.

- `app`: The content for the individual screens displayed in the app. These are sometimes categorized into subfolders based on feature (onboarding).
- `components`: Reusable React components (e.g repeated often within a screen, used across several screens, bulky components which are extremely complex, general-purpose components).
- `api/supabase/queries`: Includes most the queries 
- `data`: 
- `styles`: 
- `types`: 
- `lib:`
- `utils`:

## Deploying to Vercel

TODO: ADD DOCS HERE
