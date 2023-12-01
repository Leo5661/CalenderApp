'use client'
import { Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import EventModal from './EventModal'
function CreateEventButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button
        variant="bordered"
        startContent={<Plus size={15} />}
        size="md"
        radius="sm"
        color="primary"
        className="hidden px-8 md:flex md:w-full"
        onPress={onOpen}
      >
        Create event
      </Button>
      <Button
        variant="bordered"
        size="md"
        radius="sm"
        isIconOnly
        color="primary"
        className="flex md:hidden"
        onPress={onOpen}
      >
        <Plus size={15} color="purple" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        radius="md"
      >
        <ModalContent>
          {(onClose) => <EventModal onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateEventButton
