import { auth, config, g } from '@grafbase/sdk';

const User: any = g
  .model('User', {
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
    image: g.url(),
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
  issuer: 'https://grafbase.com',
  secret: g.env('NEXTAUTH_SECRET'),
  // audience: 'https://api.grafbase.com',
  // algorithms: ['HS256'],
  // expiresIn: '1d',
  // notBefore: '2d',
  // header: {
  //   typ: 'JWT',
  // },
  // payload: {
  //   sub: '1234567890',
  //   name: 'John Doe',
  //   admin: true,
  //   iat: 1516239022,
  // },
  // sign: {
  //   expiresIn: '1d',
  // },
  // verify: {
  //   maxAge: '2d',
  // },
});

export default config({
  schema: g,

  auth: {
    providers: [jwt],
    rules: (rules) => {
      rules.private();
    },
  },
});
