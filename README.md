# SupaGlue Starter?

## OK JK I'm nuking this and starting fresh. Clean slate.

- [x] init nex expo project, 52 beta
  - https://expo.dev/changelog/2024/10-24-sdk-52-beta#how-to-try-out-the-beta-release
- [ ] add nativewind 4.1+
  - https://www.nativewind.dev/getting-started/expo-router
- [ ] add gluestack ui? Maybe, yes
  - https://gluestack.io/ui/docs/home/getting-started/installation
- [ ] add supabase
  - https://supabase.com/docs/guides/auth/quickstarts/react-native
  - https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=secure-store
- [ ] use expo-router for web, if at all, don't bother with next-js thingadoo
- [ ] add auth routing and secure pages
  - https://docs.expo.dev/router/reference/authentication/
- [ ] add supabase functions.
  - https://supabase.com/docs/guides/functions/quickstart
  - https://supabase.com/docs/guides/functions/local-development
- [ ] add docker
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
