# SupaGlue Starter?

## OK JK I'm nuking this and starting fresh. Clean slate.

- [x] init nex expo project, 52 beta
  - https://expo.dev/changelog/2024/10-24-sdk-52-beta#how-to-try-out-the-beta-release
- [x] add nativewind 4.1+
  - https://www.nativewind.dev/getting-started/expo-router
  - https://www.nativewind.dev/getting-started/typescript
- [x] add gluestack ui? Maybe, yes
  - https://gluestack.io/ui/docs/home/getting-started/installation
  - [ ] add more/all components
  - [ ] ensure open-starter colors etc are brought
  - [ ] open-starter forms and page components, later with supabase in.
  - [ ] profile and similar routes
- [x] works with expo-web/RNW so far
- [ ] add supabase
  - https://supabase.com/docs/guides/auth/quickstarts/react-native
  - https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=secure-store
  - https://docs.expo.dev/guides/environment-variables/
  - async storage web thing LATER. https://github.com/react-native-async-storage/async-storage/issues/1096#issuecomment-2469585716
- [ ] use expo-router for web, if at all, don't bother with next-js thingadoo
  -  No need for patches then, i think. 
- [ ] add auth routing and secure pages
  - https://docs.expo.dev/router/reference/authentication/
- [ ] add supabase functions.
  - https://supabase.com/docs/guides/functions/quickstart
  - https://supabase.com/docs/guides/functions/local-development
- [ ] add docker (OPTIONAL)
  - For now, can re-use existing docker instance for local https://github.com/supabase/supabase/discussions/5968#discussioncomment-9059734
  - https://supabase.com/docs/guides/self-hosting/docker

I have forked the Gluestack starter-kit demo app, and plan to make my own modifications. I will not be using any code from paid starters that I have bought. I will instead roll my own based on supabase and expo docs. I need

- [ ] Decide on a name. thinking like supaglue, if it doesn't infringe on trademarks idk
- [ ] update this started to use latest packages including expo beta, and nativewinds 4.1+, etc
- [ ] add supabase with web/app specific configurations, based on supabase docs and public examples
- [ ] secure expo and nexjs routing based on their respective documentation examples
- [ ] integrate some of my own new components and form handling like react-ts-form
- [ ] add docs or files for supporting local-docker setup for supabase, and try to keep it very optional. maybe using like local.env and cloud.env environment variables.
- [ ] consider making a CLI for it, with Ink?
- [ ] Always keep it 100% open-source
