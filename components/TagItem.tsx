import { TagItem } from '@/redux/slices/TagSlice'
import { Tag } from 'lucide-react'

type Props = {
  tag: TagItem
}
function TagItem({ tag }: Props) {
  return (
    <div className="flex flex-row items-center p-2">
      <Tag size={15} color={tag.colorCode} />
      <div className="ml-2 text-sm font-light md:flex">{tag.name}</div>
    </div>
  )
}

export default TagItem
