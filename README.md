# SupaGlue Starter?

I have forked the Gluestack starter-kit demo app, and plan to make my own modifications. I will not be using any code from paid starters that I have bought. I will instead roll my own based on supabase and expo docs. I need
- [ ] update this started to use latest packages including expo beta, and nativewinds 4.1+, etc
- [ ] add supabase with web/app specific configurations, based on supabase docs and public examples
- [ ] secure expo and nexjs routing based on their respective documentation examples
- [ ] integrate some of my own new components and formhandling like react-ts-form
- [ ] add docs or files for supporting local-docker setup for supabase, and try to keep it very optional
- [ ] consider making a CLI for it, with Ink?
- [ ] Always keep it 100% open-source

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Seanmclem/supastack-rn-starter.git
```

2. Install dependencies:

Go to `expo-app`, `next` and `universal` folders and run the following command in each:

```bash
yarn
```

### Running the Application

#### Next.js

To run the Next.js application, run the following command:

```bash
cd next && yarn dev
```

#### Expo

To run the Expo application, run the following command:

```bash
cd expo-app && yarn start
```

#### Universal

For the Expo app in the universal project, run the following command:

```bash
cd universal && yarn run:expo
```

For the Next.js app in the universal project, run the following command:

```bash
cd universal && yarn run:next
```

## Project Structure

### Next.js

- `next`: Contains the Next.js application along with components and screens.

### Expo

- `expo`: Contains the Expo application along with components and screens.

### Universal

- `app/next`: Contains the Next.js application.
- `app/expo`: Contains the Expo application.
- `packages/components`: Shared components used across platforms.
- `packages/screens`: Shared screens that can be used in both Next.js and Expo projects.
- `packages/shared`: Shared assets

# Usage

You can copy the project of your choice (Next.js, Expo, or Universal) and start building your application. The starter kit provides a basic structure and shared components to help you get started quickly.

# Ejection

If you have copied the universal project and want to eject the project, you can run the following command:

```bash
cd universal && yarn eject
```
