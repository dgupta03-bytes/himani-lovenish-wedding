import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Music2 } from 'lucide-react'
import { music } from '../lib/music'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(music.playing)
  useEffect(() => music.subscribe(setPlaying), [])

  return (
    <motion.button
      type="button"
      onClick={() => music.toggle()}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed right-4 bottom-4 z-40 flex h-11 items-center gap-2 rounded-full border border-gold/40 bg-ivory/85 px-4 text-maroon shadow-[0_8px_24px_-10px_rgba(67,11,22,0.45)] backdrop-blur-md transition-colors hover:bg-ivory sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gold"
              animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </span>
      ) : (
        <Music2 className="h-4 w-4 text-gold" aria-hidden="true" />
      )}
      <span className="font-display text-[10px] tracking-[0.3em] uppercase">Music</span>
    </motion.button>
  )
}
