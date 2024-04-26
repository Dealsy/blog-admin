'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createPost } from '@/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import HeaderTag from '../ui/header'
import { Toaster } from '../ui/sonner'
import { PostSchema } from '@/zodSchemas'
import { useEffect, useRef } from 'react'

export default function PostForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      sub_title: '',
      content: '',
      category: '',
      type: 'public',
    },
  })

  const handleSubmit = async (formData: z.infer<typeof PostSchema>) => {
    const title = formData.title
    const sub_title = formData.sub_title
    const category = formData.category
    const type = formData.type
    const content = formData.content
    const result = PostSchema.safeParse(formData)

    if (!result.success) {
      toast.error('Something went wrong, Your post was not created', {
        action: {
          label: 'Close',
          onClick: () => {},
        },
      })
    }

    if (result.success) {
      const result = await createPost(title, content, sub_title, category, type)
      toast.success(result.message, {
        action: {
          label: 'Close',
          onClick: () => {},
        },
      })

      form.reset()
    }

    return
  }

  const handleSaveForLater = async (event: React.MouseEvent) => {
    event.preventDefault()
    const formData = form.getValues()
    const title = formData.title
    const sub_title = formData.sub_title
    const category = formData.category
    const type = 'private'
    const content = formData.content

    const result = await createPost(title, content, sub_title, category, type)

    if (result.success) {
      toast.success('Post saved successfully', {
        action: {
          label: 'Close',
          onClick: () => {},
        },
      })
    }

    if (!result.success) {
      toast.error('Something went wrong, Your post was not saved', {
        action: {
          label: 'Close',
          onClick: () => {},
        },
      })
    }

    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 flex flex-col gap-2">
          <HeaderTag text="Write a Blog" level="h2" className="text-2xl font-semibold" />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl ref={inputRef}>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sub_title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Sub Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Create content using Markdown, and the BE will do some magic!"
                    rows={30}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="outline" className="mt-8" onClick={handleSaveForLater}>
            Save For Later
          </Button>
          <Button onClick={() => form.setValue('type', 'public', { shouldValidate: true })}>
            Create Post
          </Button>
        </form>
      </Form>

      <Toaster position="bottom-right" richColors theme="light" />
    </>
  )
}
