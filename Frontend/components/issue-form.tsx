'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Issue } from '@/hooks/use-issues';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => <div className="h-[200px] w-full rounded-xl bg-slate-800 animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>
});
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
  state: z.string().min(1, 'State is required'),
  status: z.string().optional(),
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

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export function IssueForm({
  issue,
  isLoading = false,
  onSubmit,
  onClose,
}: IssueFormProps) {
  const [location, setLocation] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(issue?.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserRole(localStorage.getItem('role'));
    }
  }, []);

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
      location: (() => {
        if (!issue?.location) return '';
        try {
          const parsed = JSON.parse(issue.location);
          return parsed.address || issue.location;
        } catch {
          return issue.location;
        }
      })(),
      category: issue?.category || '',
      priority: (issue?.priority as 'low' | 'medium' | 'high' | 'critical') || 'medium',
      state: issue?.state || '',
      status: issue?.status || 'pending',
    },
  });

  const priorityValue = watch('priority');
  const categoryValue = watch('category');
  const stateValue = watch('state');
  const statusValue = watch('status');

  const handleFormSubmit = async (data: IssueFormValues) => {
    try {
      let finalLat = location ? location.lat : null;
      let finalLng = location ? location.lng : null;

      if (!finalLat || !finalLng) {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.location)}`);
          if (res.ok) {
            const results = await res.json();
            if (results && results.length > 0) {
              finalLat = parseFloat(results[0].lat);
              finalLng = parseFloat(results[0].lon);
            }
          }
        } catch (err) {
          console.error('Geocoding error:', err);
        }
      }

      await onSubmit({
        ...data,
        location: JSON.stringify({
          address: data.location,
          lat: finalLat,
          lng: finalLng
        }),
        state: data.state,
        status: data.status,
        image: imageBase64,
      });
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[550px] w-[95vw] max-h-[90vh] overflow-y-auto bg-slate-950/90 backdrop-blur-2xl border-white/10 shadow-2xl p-6 rounded-3xl">
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
          <FieldLabel>Attach Image (Optional)</FieldLabel>
          <Field>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-white file:mr-4 file:py-1 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 cursor-pointer"
              disabled={isLoading || isSubmitting}
            />
          </Field>
          {imageBase64 && (
            <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
              <img src={imageBase64} alt="Preview" className="max-h-full object-contain" />
            </div>
          )}
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Location</FieldLabel>
          <MapPicker onSelect={(loc: any) => setLocation(loc)} />
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

        <div className="grid grid-cols-2 gap-4">
          <FieldGroup>
            <FieldLabel>State / Union Territory</FieldLabel>
            <Field>
              <Select
                value={stateValue}
                onValueChange={(value) => setValue('state', value)}
                disabled={isLoading || isSubmitting}
              >
                <SelectTrigger className="bg-white/5 border-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-white">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((st) => (
                    <SelectItem key={st} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            {errors.state && (
              <p className="text-xs text-red-400">{errors.state.message}</p>
            )}
          </FieldGroup>

          {(userRole === 'authority' || userRole === 'admin') && issue ? (
            <FieldGroup>
              <FieldLabel>Status</FieldLabel>
              <Field>
                <Select
                  value={statusValue || 'pending'}
                  onValueChange={(value) => setValue('status', value)}
                  disabled={isLoading || isSubmitting}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          ) : null}
        </div>

        <DialogFooter className="pt-2">
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
