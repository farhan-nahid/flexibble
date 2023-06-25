import Modal from '@/components/create-project/modal';
import ProjectForm from '@/components/create-project/project-form';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <Modal>
      <h3 className='modal-head-text'>Create a New Project</h3>

      <ProjectForm type='create' session={session} />
    </Modal>
  );
}
