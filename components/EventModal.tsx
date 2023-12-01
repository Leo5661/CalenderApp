'use client'

import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
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
import { Dayjs } from 'dayjs'
import dayjs from '@/utils/dayjsInstance'
import { Fragment, useMemo, useState } from 'react'
import { CalendarClock, AlignLeft, Tag, Video, MapPin } from 'lucide-react'
import SideCalender from './SideCalender'
import TagItem from './TagItem'
import { getHourList, getSelectedDateTime, getTag } from '@/utils/util'
import { ZodError, z } from 'zod'
import { eventFormSchema } from '@/utils/validation'
import { nanoid } from '@reduxjs/toolkit'
import { addEvent } from '@/redux/slices/eventSlice'
import { TagItem as TagItemType } from '@/redux/slices/TagSlice'

type Props = {
  onClose: () => void
  day?: Dayjs
}

const hourList = getHourList('00', '24', 15)

function EventModal({ onClose }: Props) {
  const selectedDay = dayjs(
    useSelector((state) => state.monthSlice.selectedDate),
  )
  const [selectedTime, setSelectedTime] = useState<any>(
    new Set([selectedDay.local().format('hh:mm A')]),
  )
  const tag = useSelector((state) => state.tagSlice.tagList)
  const [selectedTab, setSelectedTabs] = useState<any>('event')
  const [selectedTagKey, setSelectedTagKey] = useState<any>(
    new Set([`${tag[2].id}`]),
  )
  const [validationErrors, setValidationErrors] =
    useState<z.inferFlattenedErrors<typeof eventFormSchema>>()
  const dispatch = useDispatch()

  const selectedTimeValue = useMemo(
    () => Array.from(selectedTime).join(),
    [selectedTime],
  )

  const selectedTag = useMemo(
    () => getTag(tag, Array.from(selectedTagKey).join()),
    [selectedTagKey],
  )

  const handleCreateEvent = (formData: FormData) => {
    const id = nanoid()
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
      dispatch(addEvent(validateForm))
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.flatten())
      }
    }
    onClose()
  }

  const EventTab = () => {
    return (
      <div>
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
            label="Description"
            placeholder="Enter your description"
            type="text"
            className="mx-4 w-full hover:bg-foreground/5 focus:bg-foreground/5"
          />
        </div>
      </div>
    )
  }

  const TaskTab = () => {
    return (
      <Fragment>
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
        <div className="mt-8 flex w-full flex-row items-center">
          <AlignLeft />
          <Textarea
            variant="underlined"
            size="sm"
            name="title"
            radius="none"
            label="Description"
            placeholder="Enter your description"
            type="text"
            className="mx-4 w-full hover:bg-foreground/5 focus:bg-foreground/5"
          />
        </div>
      </Fragment>
    )
  }

  return (
    <form action={handleCreateEvent}>
      <ModalHeader className="">Create Event</ModalHeader>
      <ModalBody className="flex flex-col items-start">
        <div className="flex w-full flex-col items-start">
          <Input
            variant="underlined"
            size="sm"
            name="title"
            required={true}
            radius="none"
            label="Title"
            type="text"
            className="w-full hover:bg-foreground/5 focus:bg-foreground/5"
          />

          <Tabs
            size="sm"
            radius="sm"
            color="primary"
            variant="underlined"
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTabs}
          >
            <Tab key="event" title="Event" className="w-full">
              <EventTab />
            </Tab>
            <Tab key="task" title="Task">
              <TaskTab />
            </Tab>
          </Tabs>

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
                disallowEmptySelection
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
          color="primary"
          radius="sm"
          type="submit"
        >
          {selectedTab == 'event' ? 'Create event' : 'Create task'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default EventModal
