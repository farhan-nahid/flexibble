import { config, g } from '@grafbase/sdk';

const User = g.model('User', {
  name: g.string().length({ min: 3, max: 50 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  description: g.string().optional(),
  projects: g
    .relation(() => Project)
    .list()
    .optional(),
});

const Project = g.model('Project', {
  title: g.string().length({ min: 3, max: 50 }),
  description: g.string().length({ min: 3, max: 500 }),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
});

export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
});
