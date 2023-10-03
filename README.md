# BCGOV User Dashboard

## Getting started

### Installation

```bash
npm install
yarn install
pnpm install
```

### Local Dev Server

```bash
npm run dev
yarn dev
pnpm dev
```

#### If using docker:

build:

```bash
docker build -t bcgov-user-dashbaord .
```

run:

```bash
docker run -p 3000:3000 --env-file .env.local bcgov-user-dashbaord
```

### Clerk Setup

- [Signup for Clerk](https://dashboard.clerk.com/sign-up)
  - Create an application
  - Enable the username signin method
  - Disable all else
  - Copy the API keys
- Rename `.env.local.example` to `.env.local` and past the API keys here.

## Deploying

We are using github actions for our CI/CD pipeline. The workflow tests, builds and then deploys the code to vercel where it is hosted.

A simple `git push` to the `main` branch will test and deploy to `production`.

#### For docker

there is an alternative aws deployment using docker as a github action. This has not been setup with keys but gives the general concept of how it would be deployed to aws with docker containerization

pushing to `main-aws` will trigger the workflow

## Assumptions

- The partner Api endpoint cannot modify and persist its data.
  - `GET` requests will return an array of user objects
  - `POST` requests will return the same user object it was given
  - `PUT` requests will return the same user object is was given
- Because data does not persist on the partner api, we will store a local copy of the initial 10 users and pretend that it is the partner database that is being modified.
- Requirements state that the data is shared with the partner. We will send POST and PUT requets as we would normally to pretend to modify the partner database. We will store the results locally to reflect changes.
- Next.js is used as a modern fullstack framework as it provides both backend and frontend functionality suitable for this type of application.

## Features

- Next.js 13 - fullstack react web framework
- React 18 - framework
- Typescript - type safety
- Clerk.dev - authentication service
- React hook form - react form library
- React Query - state management for remote data
- React Hooks
  - context
  - state
  - effect
- TRPC - end to end typesafety
- Lucide React - icons
- TailwindCss - css framework
- ShadCn - ui framework
- Zod - validation library
- Fuse.js - fuzzy search
- Vitest - unit testing framework

## User Story Testing

### User Story 1

- **Goal**:
  - As an un-authenticated public user, I want to view all the existing contacts for the company.
- **Parameters**:
  - I am a public user ✅
  - I can access a browser ✅
- **Actions**:
  - I navigate to the application link
- **Expected Results**:
  - I can view all 10 existing contacts which shows name, email, phone, website, and company name.
- **Actual Results**:
  - I can view all 10 existing contacts which shows name, email, phone, website, and company name. ✅

### User Story 2

- **Goal**:
  - As an un-authenticated public user, I want to filter the contacts whose name contains what I type.
- **Parameters**:
  - I am a public user and can access the application ✅
  - I can view all the current contacts ✅
- **Actions**:
  - I type on the name filter
- **Expected Results**:
  - I can view only names that contain what I typed
- **Actual Results**:
  - I can view only names that contain what I typed ✅

### User Story 3

- **Goal**:
  - As an un-authenticated public user, I want to create a new contact.
- **Parameters**:
  - I am a public user ✅
  - I can access the application ✅
  - I can view all the current contacts ✅
  - I can click the “Create contact” button ✅
- **Actions**:
  - I click the "Create Contact" button
  - I provide the name, email, phone, website, and company name
- **Expected Results**:
  - a new contact is created and displayed along with the other existing ones
- **Actual Results**:
  - a new contact is created and displayed along with the other existing ones ✅

### User Story 3

- **Goal**:
  - Only authenticated users can edit existing contacts. So as a public user the “edit contact” functionality is not available, but if I have an account, I can use it to login to the application.
- **Parameters**:
  - I am a public user ✅
  - I have an account ✅
  - I can access the application ✅
- **Actions**:
  - I login via my account
  - I edit a contact
- **Expected Results**:
  - I can successfully login and edit contacts
- **Actual Results**:
  - I can successfully login and edit contacts ✅

## Things to consider

- If we were to persist data
  - Flexible on what type of database ( sql/no-sql )
  - Use an ORM such as Prisma
  - All calls to the db go through the ORM inside RPC calls ( using TRPC - to get end-to-end typesafety )
  - Only save new user entries to the database as data from partern API does not persist.
- Containerization ( docker/Kubernetes etc)
  - not used in favor of using nextjs and deploying to vercel
- A more traditional back/front end structure
  - not used in favor of using nextjs
  - Would use node/express for back end
  - Would use vite/React for front end
  - Would use all tech listed in Features
- Another workflow for pull requests for full CI/CD coverage
- More testing - integration and e2e tests needed
