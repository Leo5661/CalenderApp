'use client'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { Plus, ChevronUp, ChevronDown, Tag } from 'lucide-react'
import { HexAlphaColorPicker } from 'react-colorful'
import { Fragment, useState } from 'react'
import { useSelector } from '@/hooks/useReduxHooks'
import TagItem from './TagItem'
function TagsList() {
  const tag = useSelector((state) => state.rootReducer.tagSlice.tagList)
  const [isTagListOpen, setIsTagListOpen] = useState<boolean>(true)
  const [tagName, setTagName] = useState<string>('')
  const [tagColor, setTagColor] = useState<string>('#633786')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleShowTags = () => {
    setIsTagListOpen(!isTagListOpen)
  }

  const handleCreateTag = () => {
    console.log('clicked')
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-sm font-medium text-foreground">Tags</div>
        <ButtonGroup>
          <Button
            size="sm"
            radius="sm"
            isIconOnly
            variant="light"
            className="text-xs font-light text-foreground/50"
            onPress={onOpen}
          >
            <Plus size={20} />
          </Button>
          <Button
            size="sm"
            radius="sm"
            isIconOnly
            variant="light"
            className="text-xs font-light text-foreground/50"
            onPress={handleShowTags}
          >
            {isTagListOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </Button>
        </ButtonGroup>
      </div>
      <Fragment>
        {isTagListOpen &&
          tag.map((item, index) => <TagItem key={index} tag={item} />)}
      </Fragment>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        radius="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-grow">
                Create New Tag
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center p-8">
                <input
                  name="tagName"
                  placeholder="Tag name"
                  type="text"
                  onChange={(e) => setTagName(e.target.value)}
                  className="flex-grow border-b bg-transparent outline-none"
                />
                <div className="mt-2 flex flex-row items-center justify-center border border-foreground/5 p-1">
                  <Tag size={20} color={tagColor} />
                  <input
                    name="colorCode"
                    maxLength={9}
                    minLength={4}
                    onChange={(e) => setTagColor(e.target.value)}
                    placeholder="#633786"
                    className=" ml-2 w-full bg-transparent text-center outline-none"
                  />
                </div>

                <HexAlphaColorPicker
                  color={tagColor}
                  onChange={setTagColor}
                ></HexAlphaColorPicker>
              </ModalBody>
              <ModalFooter className="flex justify-end">
                <Button
                  variant="bordered"
                  size="sm"
                  radius="sm"
                  onPress={handleCreateTag}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TagsList
