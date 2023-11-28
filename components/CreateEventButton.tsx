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
        size="lg"
        radius="sm"
        color="primary"
        className="px-8"
        onPress={onOpen}
      >
        Create event
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
