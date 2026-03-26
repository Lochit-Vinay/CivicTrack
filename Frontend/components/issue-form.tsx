'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Issue } from '@/hooks/use-issues';
import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import {
  FieldGroup,
  Field,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const issueFormSchema = z.object({
  title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
});

type IssueFormValues = z.infer<typeof issueFormSchema>;

interface IssueFormProps {
  issue?: Issue;
  isLoading?: boolean;
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

const categories = [
  'Pothole',
  'Street Light',
  'Sidewalk',
  'Graffiti',
  'Trash',
  'Water/Drainage',
  'Traffic',
  'Other',
];

export function IssueForm({
  issue,
  isLoading = false,
  onSubmit,
  onClose,
}: IssueFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormValues>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: issue?.title || '',
      description: issue?.description || '',
      location: issue?.location || '',
      category: issue?.category || '',
      priority: (issue?.priority as 'low' | 'medium' | 'high' | 'critical') || 'medium',
    },
  });

  const priorityValue = watch('priority');
  const categoryValue = watch('category');

  const handleFormSubmit = async (data: IssueFormValues) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[550px] bg-slate-950/90 backdrop-blur-2xl border-white/10 shadow-2xl p-6 rounded-3xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          {issue ? 'Edit Issue' : 'Report New Issue'}
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit((data) => handleFormSubmit(data as IssueFormValues))} className="space-y-4">
        <FieldGroup>
          <FieldLabel>Title</FieldLabel>
          <Field>
            <Input
              {...register('title')}
              placeholder="Brief title of the issue"
              className="bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-white"
              disabled={isLoading || isSubmitting}
            />
          </Field>
          {errors.title && (
            <p className="text-xs text-red-400">{errors.title.message}</p>
          )}
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Description</FieldLabel>
          <Field>
            <Textarea
              {...register('description')}
              placeholder="Describe the issue in detail"
              className="bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl min-h-[140px] resize-none text-white p-3"
              disabled={isLoading || isSubmitting}
            />
          </Field>
          {errors.description && (
            <p className="text-xs text-red-400">{errors.description.message}</p>
          )}
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Location</FieldLabel>
          <Field>
            <Input
              {...register('location')}
              placeholder="Street address or location"
              className="bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-white"
              disabled={isLoading || isSubmitting}
            />
          </Field>
          {errors.location && (
            <p className="text-xs text-red-400">{errors.location.message}</p>
          )}
        </FieldGroup>

        <div className="grid grid-cols-2 gap-4">
          <FieldGroup>
            <FieldLabel>Category</FieldLabel>
            <Field>
              <Select
                value={categoryValue}
                onValueChange={(value) => setValue('category', value)}
                disabled={isLoading || isSubmitting}
              >
                <SelectTrigger className="bg-white/5 border-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            {errors.category && (
              <p className="text-xs text-red-400">{errors.category.message}</p>
            )}
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Priority</FieldLabel>
            <Field>
              <Select
                value={priorityValue}
                onValueChange={(value) =>
                  setValue('priority', value as 'low' | 'medium' | 'high' | 'critical')
                }
                disabled={isLoading || isSubmitting}
              >
                <SelectTrigger className="bg-white/5 border-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            {errors.priority && (
              <p className="text-xs text-red-400">{errors.priority.message}</p>
            )}
          </FieldGroup>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading || isSubmitting}
            className="hover:bg-white/10 text-slate-300 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl font-medium px-6"
          >
            {isLoading || isSubmitting ? (
              <>
                <Spinner className="w-4 h-4 mr-2" />
                {issue ? 'Updating...' : 'Creating...'}
              </>
            ) : issue ? (
              'Update Issue'
            ) : (
              'Create Issue'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
