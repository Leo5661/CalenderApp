'use client'
import { EventItem, removeEvent } from '@/redux/slices/eventSlice'
import { getTag, truncate } from '@/utils/util'
import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Snippet,
  Link,
  Textarea,
  Button,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalContent,
} from '@nextui-org/react'
import { Tag, Trash2, X } from 'lucide-react'
import dayjs from '@/utils/dayjsInstance'
import { useState } from 'react'
import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import EditEventModal from './EditEventModal'
import { setSelectedDate } from '@/redux/slices/MonthSlice'

type Props = {
  task: EventItem
}
function EventDetailsPopover({ task }: Props) {
  const tag = useSelector((state) => state.tagSlice.tagList)
  const dispatch = useDispatch()
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  let selectedTag = undefined

  if (task.tagId != undefined && task.tagId !== '') {
    selectedTag = getTag(tag, task.tagId)
  }

  const handleOpen = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  const handleDelete = () => {
    dispatch(removeEvent(task))
    handleOpen()
  }

  const handleEdit = () => {
    dispatch(setSelectedDate(task.dateTime))
    handleOpen()
    onOpen()
  }

  return (
    <div className="w-full ">
      <Popover
        placement="right"
        size="sm"
        radius="sm"
        backdrop="opaque"
        isOpen={isPopoverOpen}
        onOpenChange={(open) => setIsPopoverOpen(open)}
      >
        <PopoverTrigger>
          <Button
            size="sm"
            variant="light"
            startContent={
              <Tag size={15} color={selectedTag ? selectedTag.colorCode : ''} />
            }
            className="my-1 w-full rounded-full border border-purple/30 text-xs font-extralight text-foreground/80 outline-none hover:cursor-pointer"
          >
            {truncate(task.title, 15)}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col items-center p-2">
            <div className=" flex w-full flex-row items-center justify-between px-1">
              <div className="text-base font-medium text-foreground">
                {task.title}
              </div>
              <ButtonGroup size="sm" radius="sm" variant="light">
                <Button
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  onPress={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  radius="sm"
                  onPress={handleOpen}
                >
                  <X size={15} />
                </Button>
              </ButtonGroup>
            </div>
            <Divider className="mb-4 mt-1" />
            <div className=" flex w-full flex-col space-y-2">
              <div className="text-xs font-light text-foreground/50">
                Date-Time
              </div>
              <div className="text-md px-2 font-medium text-foreground">
                {dayjs
                  .utc(task.dateTime)
                  .local()
                  .format('dddd, MMMM DD - HH:MM A')}
              </div>
            </div>
            <div
              className={`w-full flex-col space-y-2 ${
                task.meetLink ? 'flex' : 'hidden'
              }`}
            >
              <div className="mt-4 text-xs font-light text-foreground/50">
                Event link
              </div>
              <Snippet
                symbol={'🔗'}
                variant="bordered"
                className=""
                size="sm"
                radius="sm"
              >
                <Link
                  size="sm"
                  isExternal={true}
                  href={`https://nextui.org/docs/components/snippet`}
                  underline="hover"
                >{`https://nextui.org/docs/components/snippet`}</Link>
              </Snippet>
            </div>
            <div
              className={`w-full flex-col space-y-2 ${
                task.location ? 'flex' : 'hidden'
              }`}
            >
              <div className="mt-4 text-xs font-light text-foreground/50">
                Location
              </div>
              <div className="text-md px-2 font-medium text-foreground">
                {task.location}
              </div>
            </div>
            <div
              className={`w-full flex-col space-y-2 ${
                task.description ? 'flex' : 'hidden'
              }`}
            >
              <div className="mt-4 text-xs font-light text-foreground/50">
                Description
              </div>
              <Textarea
                isReadOnly
                variant="flat"
                defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                className="text-md max-w-xs font-medium text-foreground"
              />
            </div>
            <Button
              isIconOnly
              color="danger"
              variant="bordered"
              size="sm"
              className="mt-4 w-full"
              endContent={<Trash2 size={15} className="" />}
              radius="sm"
              onPress={handleDelete}
            >
              Remove
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        radius="md"
      >
        <ModalContent>
          {(onClose) => <EditEventModal task={task} onClose={onClose} />}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EventDetailsPopover
