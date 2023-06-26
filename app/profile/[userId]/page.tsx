import { UserProfile } from '@/common.types';
import Profile from '@/components/profile/profile';
import { getSingleUserProjects } from '@/lib/actions';

type Props = {
  params: {
    userId: string;
  };
};

const UserProfile = async ({ params: { userId } }: Props) => {
  const result = (await getSingleUserProjects(userId, 100)) as {
    user: UserProfile;
  };

  if (!result?.user) return <p className='no-result-text'>Failed to fetch user info</p>;

  return <Profile user={result?.user} />;
};

export default UserProfile;
