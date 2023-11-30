import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
import { AlignLeft, CalendarClock, MapPin, Tag, Video } from 'lucide-react'
import SideCalender from './SideCalender'
import TagItem from './TagItem'
import { EventItem, updateEvent } from '@/redux/slices/eventSlice'
import { Dayjs } from 'dayjs'
import dayjs from '@/utils/dayjsInstance'
import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import { useMemo, useState } from 'react'
import { getHourList, getSelectedDateTime, getTag } from '@/utils/util'
import { eventFormSchema } from '@/utils/validation'
import { ZodError } from 'zod'
import { TagItem as TagItemType } from '@/redux/slices/TagSlice'

type Props = {
  task: EventItem
  onClose: () => void
}

const hourList = getHourList('00', '24', 15)
function EditEventModal({ task, onClose }: Props) {
  const selectedDay = dayjs(
    useSelector((state) => state.monthSlice.selectedDate),
  )
  const eventDateTime: Dayjs = dayjs(task.dateTime)
  const tag = useSelector((state) => state.tagSlice.tagList)
  const dispatch = useDispatch()
  const [selectedTime, setSelectedTime] = useState<any>(
    new Set([eventDateTime.local().format('hh:mm A')]),
  )
  const [selectedTagKey, setSelectedTagKey] = useState<any>(
    new Set([`${tag[2].id}`]),
  )

  const selectedTimeValue = useMemo(
    () => Array.from(selectedTime).join(),
    [selectedTime],
  )

  const selectedTag = useMemo(
    () => getTag(tag, Array.from(selectedTagKey).join()),
    [selectedTagKey],
  )

  const handleUpdateEvent = (formData: FormData) => {
    const id = task.id
    const dateTime = getSelectedDateTime(
      selectedDay,
      selectedTimeValue,
    ).toString()

    const eventFormData = {
      id: id,
      title: formData.get('title') ?? '',
      meetLink: formData.get('meetLink')
        ? `https://${formData.get('meetLink')}`
        : undefined,
      location:
        formData.get('location') === ''
          ? undefined
          : formData.get('location')?.toString().trim(),
      description: formData.get('description') ?? undefined,
      dateTime: dateTime,
      tagId: selectedTag?.id ?? undefined,
    }
    try {
      const validateForm = eventFormSchema.parse(eventFormData)
      dispatch(updateEvent(validateForm))
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.flatten())
      }
    }
    onClose()
  }

  return (
    <form action={handleUpdateEvent}>
      <ModalHeader className="">Update Event</ModalHeader>

      <ModalBody className="flex flex-col items-start">
        <div className="flex w-full flex-col items-start">
          <Input
            variant="underlined"
            size="sm"
            name="title"
            required={true}
            radius="none"
            label="Title"
            defaultValue={task.title}
            type="text"
            className="w-full hover:bg-foreground/5 focus:bg-foreground/5"
          />

          <div className="mt-4 flex flex-row items-center">
            <CalendarClock size={20} />
            <div className="flex flex-grow flex-row">
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Input
                    variant="underlined"
                    size="sm"
                    readOnly
                    value={selectedDay.format('dddd, MMMM DD')}
                    defaultValue={eventDateTime.format('dddd, MMMM DD')}
                    className="mx-4 hover:bg-foreground/5 focus:bg-foreground/5"
                    radius="none"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <SideCalender />
                </PopoverContent>
              </Popover>
              <Dropdown size="sm" radius="none">
                <DropdownTrigger>
                  <Input
                    variant="underlined"
                    size="sm"
                    readOnly
                    value={selectedTimeValue}
                    defaultValue={eventDateTime.format('hh:mm A')}
                    className="mx-1 hover:bg-foreground/5 focus:bg-foreground/5"
                    radius="none"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Time selection option"
                  variant="light"
                  selectionMode="single"
                  disallowEmptySelection
                  selectedKeys={selectedTime}
                  onSelectionChange={setSelectedTime}
                  className="h-40 overflow-hidden overflow-y-scroll"
                >
                  {hourList.map((item: string) => (
                    <DropdownItem key={item}>{item}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-row items-center">
            <Video />
            <Input
              variant="underlined"
              size="sm"
              name="meetLink"
              radius="none"
              defaultValue={task.meetLink}
              label="Meeting Link"
              type="url"
              className="mx-4 w-full hover:bg-foreground/5 focus:bg-foreground/5"
            />
          </div>
          <div className="mt-4 flex w-full flex-row items-center">
            <MapPin />
            <Input
              variant="underlined"
              size="sm"
              name="location"
              defaultValue={task.location}
              radius="none"
              label="Location"
              type="text"
              className="mx-4 w-full hover:bg-foreground/5 focus:bg-foreground/5"
            />
          </div>
          <div className="mt-4 flex w-full flex-row items-center">
            <AlignLeft />
            <Textarea
              variant="underlined"
              size="sm"
              name="description"
              radius="none"
              defaultValue={task.description}
              label="Description"
              placeholder="Enter your description"
              type="text"
              className="mx-4 w-full hover:bg-foreground/5 focus:bg-foreground/5"
            />
          </div>
          <div className="mt-4 flex w-full flex-row items-center ">
            <Tag color={selectedTag?.colorCode} />
            <Dropdown size="sm" radius="sm">
              <DropdownTrigger>
                <Button
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  className={`mx-4 w-60 text-[${selectedTag?.colorCode}]`}
                >
                  {selectedTag?.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Tag selection option"
                selectionMode="single"
                selectedKeys={selectedTagKey}
                onSelectionChange={setSelectedTagKey}
              >
                {tag.map((item: TagItemType) => (
                  <DropdownItem key={item.id}>
                    <TagItem tag={item} />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="flex justify-end">
        <Button
          variant="bordered"
          size="sm"
          color="danger"
          radius="sm"
          type="submit"
        >
          Update
        </Button>
      </ModalFooter>
    </form>
  )
}

export default EditEventModal
