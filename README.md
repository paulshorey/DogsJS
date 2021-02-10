# Discover all the breeds / sub-breeds of dogs

### https://dogs.paulshorey.com

(deployed to Vercel)

# Why Dogs ?

1. This has been made possible by the awesome API at [dog.ceo](https://dog.ceo) - it's powerful and fun to use
2. This was an experiment - to learn NextJS techniques - to practice using dynamic routes (and sub-routes) with SSG/SSR

NextJS is a genius framework. This site renders hundreds of different types of dogs - all nearly instantly (even the images use NextJS `next/image` component, so are optimized for performance and a higher [Lighthouse](https://developers.google.com/web/tools/lighthouse) score)

## Running / Developing :

Feel free to use this codebase to start you **next** project. Please contribute (fork/pull-request) any improvements. Please let me know what you think. I will appreciate any suggestions! ~ [Paul](https://paulshorey.com)

> Dev env: **`npm start`** will run `npm install && npm run dev`\
> Preview: **`npm run build && npm run serve`** actually runs `next build` and `next start -p 3000`

## Testing :

This project uses NextJS infrastructure and a lot of server-side-generated content. Unit tests would be a big pain to set up. What's much easier and actually more effective? Try "end-to-end testing", also called "functional testing". Use "Puppeteer" (a programmable Chrome browser) to check that all important content has been generated correctly and all important user-interactions are working.

> No more spending hours mocking data sources. Nothing to mock at all. It's real - same content the user will see. This "puppeteer" powered "functional testing" runs just as reliably and almost as quickly as traditional unit tests.

### npm run test

**When developing the app, just `git commit` the changes.** Testing is integrated into the CI process. The tests will automatically run. If the tests fail, the commit will also fail.

> Step 1) Runs **lint**, **build**, and **serve** the app.
> Step 2) Runs tests using `jest --verbose`.
> Step 3) Whether tests succeed or fail, the server is stopped, so it will not block future processes.
> Step 4) If any tests fail (including the initial `lint`), you will see instructions about what needs to be fixed. If this was triggered by a `git commit`, you will not be allowed to push changes until you fix the tests and run `git commit` again.

### Pre-commit hook:

This uses "husky" to add "pre-commit" or other hooks to your "git commit" command:

```
"husky": {
  "hooks": {
    "pre-commit": "npm run test"
  }
},
```
