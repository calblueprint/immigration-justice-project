# Immigration Justice Project

This project is being built by a team at [Blueprint](https://calblueprint.org), a student organization at the University of California, Berkeley building software pro bono for nonprofits.

## Getting Started

### Prerequisites

Check your installation of `npm` and `node`:

```sh
node -v
npm -v
```

We strongly recommend using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) (for Mac) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows) to install Node.js and npm. See [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Installation

1. Clone the repo & install dependencies
   1. Clone this repo
      * using SSH (recommended)
         ```sh
         git clone git@github.com:calblueprint/immigration-justice-project.git
         ```
      * using HTTPS
         ```sh
         git clone https://github.com/calblueprint/immigration-justice-project.git
         ```
   2. Enter the cloned directory
        ```sh
        cd immigration-justice-project
        ```
   3. Install project dependencies. This command installs all packages from [`package.json`](package.json).
      ```sh
      npm install
      ```

2. Set up secrets:
   1. In the project's root directory (`immigration-justice-project/`), create a new file named `.env.local`
   2. Copy the credentials from [Blueprint's internal Notion](https://www.notion.so/calblueprint/Environment-Setup-6fb1e251cdca4393b9dd47a3436abc11?pvs=4#9c2ff603f7a44348835c97e96d521d2d) (access is required) and paste them into the `.env.local` file.

**Helpful resources**
* [GitHub: Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
* [GitHub: Generating SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### Development environment

- **[VSCode](https://code.visualstudio.com/) (recommended)**
  1. Open the `immigration-justice-project` project in VSCode.
  2. Install recommended workspace VSCode extensions. You should see a pop-up on the bottom right to "install the recommended extensions for this repository".

### Running the app

In the project directory, run:
   ```shell
    npm run dev
   ```

Then, navigate to http://localhost:3000 to launch the web application.
