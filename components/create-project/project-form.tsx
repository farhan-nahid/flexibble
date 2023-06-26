'use client';

import type { FormState, ProjectInterface, SessionInterface } from '@/common.types';
import { categoryFilters } from '@/constant';
import { createProject, fetchToken } from '@/lib/actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../core/button';
import CustomMenu from './custom-menu';
import FormField from './form-field';

interface ProjectFormProps {
  type: 'create' | 'edit';
  session: SessionInterface;
  project?: ProjectInterface;
}

export default function ProjectForm({ session, type, project }: ProjectFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image!');

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createProject(form!, session?.user!, token!);

        // router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      // router.push('/');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>
      <div className='flexStart form_image-container'>
        <label htmlFor='imageUrl' className='flexCenter form_image-label'>
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          id='imageUrl'
          type='file'
          accept='image/*'
          required={type === 'create' ? true : false}
          className='form_image-input'
          onChange={(e) => handleChangeImage(e)}
        />
        {form?.image && (
          <Image
            src={form?.image}
            className='sm:p-10 object-contain z-20'
            alt='image'
            fill
          />
        )}
      </div>

      <FormField
        title='Title'
        state={form.title}
        placeholder='Flexibble'
        setState={(value) => handleStateChange('title', value)}
      />

      <FormField
        title='Description'
        state={form.description}
        placeholder='Showcase and discover remarkable developer projects.'
        isTextArea
        setState={(value) => handleStateChange('description', value)}
      />

      <FormField
        type='url'
        title='Website URL'
        state={form.liveSiteUrl}
        placeholder='https://jsmastery.pro'
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />

      <FormField
        type='url'
        title='GitHub URL'
        state={form.githubUrl}
        placeholder='https://github.com/adrianhajdin'
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className='flexStart w-full'>
        <Button
          title={
            submitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type='submit'
          leftIcon={submitting ? '' : '/plus.svg'}
          submitting={submitting}
        />
      </div>
    </form>
  );
}
