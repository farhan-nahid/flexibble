import { ProjectInterface } from '@/common.types';
import Modal from '@/components/core/modal';
import ProjectForm from '@/components/create-project/project-form';
import { fetchProjectsDetailsById } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

interface ProjectDetailsProps {
  params: {
    projectId: string;
  };
}

const EditProject = async ({ params: { projectId } }: ProjectDetailsProps) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  const project = (await fetchProjectsDetailsById(projectId)) as {
    project?: ProjectInterface;
  };

  if (!project?.project)
    return <p className='no-result-text'>Failed to fetch project info</p>;

  return (
    <Modal>
      <h3 className='modal-head-text'>Edit Project</h3>

      <ProjectForm type='edit' session={session} project={project?.project} />
    </Modal>
  );
};

export default EditProject;
