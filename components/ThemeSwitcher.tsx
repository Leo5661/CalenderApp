'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@nextui-org/react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const handleClick = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <Button
      variant="light"
      size="sm"
      radius="sm"
      isIconOnly
      onClick={handleClick}
    >
      {theme == 'light' ? (
        <Moon className="text-foreground" />
      ) : (
        <Sun className="text-foreground" />
      )}
    </Button>
  )
}
