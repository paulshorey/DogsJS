# Discover all the breeds / sub-breeds of dogs

https://dogs.paulshorey.com 
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

This project uses NextJS infrastructure and a lot of server-side-generated content. Unit tests would be a big pain to set up, and are actually not recommended by the community. What's much easier and actually more effective? It's "end-to-end testing"! Also called "functional testing". This runs the app using "Puppeteer", a headless programmable Chrome browser. Execute whatever tests you want, to check that important content has been generated correctly, and important user-interactions are working.

> No more spending hours mocking data sources. Nothing to mock at all. It's real - same content the user will see. This "puppeteer" powered "functional testing" runs just as reliably and quickly as unit tests.

### Simply command: **`npm run test`** 
**Or ignore that and just `git commit` your changes.** The testing is integrated into the CI process. The tests will automatically run. If the tests fail, the commit will also fail.

1. First, the script runs **lint**, **build**, then starts serving the app at port **:9754**.
2. Then it runs tests using `jest --verbose`. Jest is configured in `jest.config.js`
3. Whether they succeed or fail, the server is stopped, so that it can repeat the process next time if necessary.
4. If any tests fail (including the initial `lint`), you will see instructions about what needs to be fixed. If this was triggered by a `git commit`, it will not be allowed to execute until you fix the tests and run `git commit` again.

This uses "husky" to add "pre-commit" or other hooks to your "git commit" command:
```
"husky": {
  "hooks": {
    "pre-commit": "npm run test"
  }
},
"test": "npm run lint && npm run build && npm run test_start_server && npm run test_run_tests && npm run test_stop_server",
```

Helper scripts used by `npm run test`:
```
"test_start_server": "next start -p 9754 &",
"test_run_tests": "jest --verbose || npm run test_stop_server",
"test_stop_server": "kill -9 $(lsof -i TCP:9754 | grep LISTEN | awk '{print $2}')"
```

## Future plans:
* **tests are not finished (just started)**
* maybe - caching http requests in server-side - re-build the site with old data if it does not need to be updated
