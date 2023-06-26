import type { ProjectInterface } from '@/common.types';
import ProjectCard from '@/components/project-card';
import { fetchAllProjects } from '@/lib/actions';

interface ProjectSearch {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export default async function Home() {
  const data = (await fetchAllProjects()) as ProjectSearch;

  const projects = data?.projectSearch?.edges?.map((edge) => edge?.node) || [];

  if (projects.length === 0) {
    return (
      <section className='flexStart flex-col paddings'>
        <p className='no-result-text text-center'>
          No Project Found. Go create some projects
        </p>
      </section>
    );
  }

  return (
    <div className='flexStart flex-col paddings mb-16'>
      <section className='projects-grid'>
        {projects.map((node: ProjectInterface) => {
          return <ProjectCard key={node.id} data={node} />;
        })}
      </section>
    </div>
  );
}
