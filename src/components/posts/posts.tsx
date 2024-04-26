'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import { deletePost, updatePost } from '@/actions'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Post } from '@/app/admin/page'
import HeaderTag from '../ui/header'
import { Toaster } from '../ui/sonner'
import { Routes } from '@/contstants'
import { Card } from '../ui/card'

type postActions = 'delete' | 'update' | null

export default function Posts({
  title: initialTitle,
  sub_title,
  content: initialContent,
  category = '',
  id,
  type,
  created_at,
  updated_at,
}: Post) {
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle)
  const [updateSubTitle, setUpdatedSubTitle] = useState(sub_title)
  const [updatedContent, setUpdatedContent] = useState(initialContent)
  const [updatedCategory, setUpdatedCategory] = useState(category)
  const [updatedType, setUpdatedType] = useState(type ?? 'public')
  const [openModel, setOpenModel] = useState<postActions>(null)

  const types = ['public', 'private']

  const { push } = useRouter()

  const formattedDate = format(created_at, "dd/MM/yyyy 'at' h:mm a")

  const updateFormattedDate = updated_at ? format(updated_at, "dd/MM/yyyy 'at' h:mm a") : null

  const handleRedirect = () => {
    push(`${Routes.POST}/${id}`)
  }

  const handleDeletePostClick = async (e: React.UIEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    const result = await deletePost(id)
    if (result.success) {
      toast.error(result.message, {
        action: {
          label: 'Close',
          onClick: () => {},
        },
      })
    }
  }

  const handleUpdatePost = async (
    e: React.UIEvent<HTMLButtonElement>,
    id: number,
    title: string,
    content: string,
    sub_title: string,
    category: string,
    updatedType: string,
  ) => {
    e.stopPropagation()

    const result = await updatePost(id, title, content, sub_title, category, updatedType)
    if (result.success) {
      toast.success(result.message, {
        action: {
          label: 'Close',
          onClick: () => {},
        },
      })
    }
  }

  const handleOpenModal = (e: React.UIEvent<HTMLButtonElement>, type: postActions) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenModel(type)
  }

  const handleCloseModal = () => {
    setOpenModel(null)
  }

  return (
    <>
      <Card
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleRedirect()
          }
        }}
        onClick={handleRedirect}
        className={cn(
          'group m-2 flex flex-col items-center gap-5 rounded-lg border p-5',
          'hover:cursor-pointer hover:bg-black hover:text-white',
          'focus:bg-black focus:text-white focus:outline-none focus:ring-2',
          'focus:group focus:ring-black focus:ring-offset-2',
        )}>
        <div className="w-full">
          <HeaderTag
            level="h1"
            text={initialTitle}
            className="mt-4 text-xl font-semibold group-hover:text-white"
          />
          <HeaderTag
            level="h2"
            text={sub_title}
            className={cn(
              'mb-4 text-base font-medium group-hover:text-white',
              'group-focus:text-white',
            )}
          />
          <div className="flex flex-col gap-2">
            <time
              className={cn(
                'mt-2 text-[12px] text-black text-opacity-75',
                'group-hover:text-white',
                'group-focus:text-white',
              )}>
              Created: {formattedDate}
            </time>
            {updated_at && (
              <time
                className={cn(
                  'text-[12px] text-black text-opacity-75',
                  'group-hover:text-white',
                  'group-focus:text-white',
                )}>
                Last updated: {updateFormattedDate}
              </time>
            )}
          </div>
        </div>
        <div className="flex w-full flex-row gap-2">
          <Button
            aria-label="Delete Post"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleOpenModal(e, 'delete')
              }
            }}
            onClick={e => handleOpenModal(e, 'delete')}
            className={cn('hover:scale-105 group-hover:bg-red-500', ' group-focus:bg-red-500 ')}>
            Delete
          </Button>
          <Button
            aria-label="Edit Post"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleOpenModal(e, 'update')
              }
            }}
            onClick={e => handleOpenModal(e, 'update')}
            variant={'outline'}
            className={cn(
              'hover:scale-105 hover:text-white active:scale-105',
              'group-hover:border-black group-hover:bg-blue-500',
              'group-focus:border-black group-focus:bg-blue-500',
            )}>
            <Pencil />
          </Button>
        </div>
      </Card>

      <Dialog open={openModel === 'delete'} onOpenChange={handleCloseModal}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>

          <p>Are you sure you want to delete this post?</p>

          <p>
            {' '}
            Post: <b>{initialTitle}</b>{' '}
          </p>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="mt-4 sm:mt-0">
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                variant={'destructive'}
                onClick={e => handleDeletePostClick(e, id)}
                type="submit">
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openModel === 'update'} onOpenChange={handleCloseModal}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="title" className="text-left">
                Title
              </Label>
              <Input
                id="title"
                defaultValue={initialTitle}
                className="col-span-3"
                onChange={e => setUpdatedTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="title" className="text-left">
                Sub Title
              </Label>
              <Input
                id="title"
                defaultValue={sub_title}
                className="col-span-3"
                onChange={e => setUpdatedSubTitle(e.target.value)}
              />
              <Label htmlFor="category" className="text-left">
                Category
              </Label>
              <Input
                id="category"
                defaultValue={category}
                className="col-span-3"
                onChange={e => setUpdatedCategory(e.target.value)}
              />
              <div>
                <Label htmlFor="type" className="text-left">
                  Type
                </Label>
                <Select onValueChange={setUpdatedType} value={updatedType}>
                  <SelectTrigger>
                    <SelectValue placeholder={updatedType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{updatedType}</SelectLabel>
                      {types.map(itemType => (
                        <SelectItem key={itemType} value={itemType}>
                          {itemType}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="content" className="text-left">
                Content
              </Label>
              <Textarea
                rows={30}
                id="content"
                className="col-span-3"
                defaultValue={initialContent}
                onChange={e => setUpdatedContent(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="mt-4 sm:mt-0">
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                onClick={e =>
                  handleUpdatePost(
                    e,
                    id,
                    updatedTitle,
                    updatedContent,
                    updateSubTitle,
                    updatedCategory,
                    updatedType,
                  )
                }
                type="submit">
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" richColors theme="light" />
    </>
  )
}
