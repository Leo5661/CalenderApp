import { useSelector } from '@/hooks/useReduxHooks'
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
  Textarea,
} from '@nextui-org/react'
import dayjs, { Dayjs } from 'dayjs'
import { Fragment, useEffect, useState } from 'react'
import { CalendarClock, AlignLeft, Tag } from 'lucide-react'
import SideCalender from './SideCalender'
import TagItem from './TagItem'

type Props = {
  onClose: () => void
  day?: Dayjs
}
function EventModal({ onClose, day }: Props) {
  const selectedDay = dayjs(
    useSelector((state) => state.rootReducer.monthSlice.selectedDate),
  )
  const tag = useSelector((state) => state.rootReducer.tagSlice.tagList)

  const handleCreateEvent = () => {
    console.log('clicked create event')
    onClose()
  }

  return (
    <Fragment>
      <ModalHeader className="">Create Event</ModalHeader>

      <ModalBody className="flex flex-col items-start">
        <form className="flex w-full flex-col items-start">
          <Input
            variant="underlined"
            size="sm"
            name="title"
            required
            radius="none"
            label="Title"
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
                    className="mx-4 hover:bg-foreground/5 focus:bg-foreground/5"
                    radius="none"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <SideCalender />
                </PopoverContent>
              </Popover>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Input
                    variant="underlined"
                    size="sm"
                    readOnly
                    value={selectedDay.local().format('HH-mm')}
                    className="mx-1 hover:bg-foreground/5 focus:bg-foreground/5"
                    radius="none"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <SideCalender />
                </PopoverContent>
              </Popover>
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
          <div className="mt-8 flex w-full flex-row items-center">
            <Tag />
            <Dropdown size="sm" radius="sm">
              <DropdownTrigger>
                <Button
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  className="mx-4"
                >
                  Select tag
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {tag.map((item, index) => (
                  <DropdownItem>
                    <TagItem key={index} tag={item} />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </form>
      </ModalBody>

      <ModalFooter className="flex justify-end">
        <Button
          variant="bordered"
          size="sm"
          color="primary"
          radius="sm"
          onPress={handleCreateEvent}
        >
          Create Task
        </Button>
      </ModalFooter>
    </Fragment>
  )
}

export default EventModal
