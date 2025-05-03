import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createLesson } from '@/rpc/lessons';
import { CreateLessonFormInput, createLessonSchema } from '@/validations/lesson';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type CreateLessonDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateLessonDialog = ({ open, onOpenChange }: CreateLessonDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: CreateLessonFormInput) => await createLesson(data),
    onSuccess: response => {
      router.push(`/dashboard/lessons/${response.id}`);
    },
    onError: error => {
      toast.error(`Error creating lesson: ${error.message}`);
    },
  });

  const form = useForm<CreateLessonFormInput>({
    resolver: zodResolver(createLessonSchema),
  });

  const handleSubmit = async (data: CreateLessonFormInput) => {
    await mutation.mutateAsync(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      form.setValue('files', [...files, ...newFiles], { shouldValidate: true });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    form.setValue('files', updatedFiles, { shouldValidate: true });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[1200px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Create a lesson</DialogTitle>
          <DialogDescription className="text-xs">
            Create a lesson to help your students learn and grow. You can create a lesson by
            providing a name, objective, and context. The lesson will be generated based on the
            information you provide.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
            <div className="grid gap-4">
              <FormField
                name="subject"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                name="grade"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                name="topic"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage {...field} className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                name="objective"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage {...field} className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>Files</FormLabel>
                  <FormControl>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Icons.upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and
                              drop
                            </p>
                            <p className="text-xs text-gray-500">
                              Any file type (MAX. 5MB per file)
                            </p>
                          </div>
                          <Input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {files.length > 0 && (
                        <div className="grid gap-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                            >
                              <div className="flex items-center space-x-2">
                                <Icons.file className="h-4 w-4 text-primary" />
                                <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  ({(file.size / 1024).toFixed(2)} KB)
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <Icons.squarePlus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending}>
              Continue
              {mutation.isPending && <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
