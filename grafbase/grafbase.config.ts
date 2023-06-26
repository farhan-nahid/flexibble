import { auth, config, g } from '@grafbase/sdk';

const User: any = g
  .model('User', {
    userId: g.string().unique(),
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
  })
  .auth((rule) => rule.public().read());

const Project: any = g
  .model('Project', {
    title: g.string().length({ min: 3, max: 50 }),
    description: g.string().length({ min: 3, max: 500 }),
    imageUrl: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
  })
  .auth((rule) => {
    rule.public().read();
    rule.private().create().update().delete();
  });

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET'),
});

export default config({
  schema: g,

  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
