"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  id: z.string().min(3, 'ID must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface LoginFormProps {
  onLogin: (userId: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isNewUser, setIsNewUser] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const existingUser = storage.getUser(data.id);

    if (isNewUser) {
      if (existingUser) {
        toast({
          title: "Error",
          description: "User ID already exists. Please choose a different ID.",
          variant: "destructive",
        });
        return;
      }
      storage.saveUser({ id: data.id, password: data.password });
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } else {
      if (!existingUser || existingUser.password !== data.password) {
        toast({
          title: "Error",
          description: "Invalid ID or password.",
          variant: "destructive",
        });
        return;
      }
    }
    onLogin(data.id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h1 className="text-2xl font-bold mb-2">Quiz Master</h1>
          <p className="text-sm text-muted-foreground">
            {isNewUser ? 'Create an account to start' : 'Login to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Enter your ID"
              {...register('id')}
              className="w-full"
            />
            {errors.id && (
              <p className="text-sm text-red-500 mt-1">{errors.id.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className="w-full"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isNewUser ? 'Create Account' : 'Login'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsNewUser(!isNewUser)}
            className="text-sm text-blue-500 hover:underline"
          >
            {isNewUser
              ? 'Already have an account? Login'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </Card>
    </div>
  );
}