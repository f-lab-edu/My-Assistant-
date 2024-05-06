import { UseFormReturn } from 'react-hook-form';
import { Badge } from '../ui/badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import * as z from 'zod';
import { createTaskSchema } from '@/lib/schemas/task.schema';
import { X } from 'lucide-react';

export function DocsCreateTags({
  form,
  type,
}: {
  form: UseFormReturn<z.infer<typeof createTaskSchema>>;
  type: 'edit' | 'create';
}) {
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== '') {
        if (tagValue?.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters.',
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue('tags', newTags);
  };

  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem className="w-full px-4">
          <div className="flex w-full items-center">
            <FormLabel className="flex-1 text-[0.875rem] text-gray-500">
              Tags
            </FormLabel>
            <FormControl>
              <Input
                disabled={type === 'edit'}
                className="w-full flex-1"
                placeholder="Add tags..."
                onKeyDown={(e) => handleInputKeyDown(e, field)}
              />
            </FormControl>
          </div>
          {field.value?.length > 0 && (
            <div className="flex-start mt-3 flex-wrap">
              {field.value.map((tag: any) => (
                <Badge
                  key={tag}
                  className="my-2 mr-2 cursor-pointer gap-2 px-4 py-2 capitalize"
                  onClick={() =>
                    type !== 'edit' ? handleTagRemove(tag, field) : () => {}
                  }
                >
                  {tag}
                  {type !== 'edit' && <X className="h-4 w-4 object-contain" />}
                </Badge>
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
