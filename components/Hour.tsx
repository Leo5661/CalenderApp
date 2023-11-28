import { Divider } from '@nextui-org/react'

type Props = {
  hour: string
}
function Hour({ hour }: Props) {
  return (
    <div className="flex flex-row items-center justify-start border-b border-foreground/5 px-5">
      <div className="py-6 pr-4 text-xs font-light text-foreground/50">
        {hour}
      </div>
      <Divider orientation="vertical" />
    </div>
  )
}

export default Hour
