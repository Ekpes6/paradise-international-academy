import { motion } from 'framer-motion'

interface Props {
  fullScreen?: boolean
  message?: string
}

export default function LoadingSpinner({ fullScreen = false, message = 'Loading…' }: Props) {
  const inner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-yellow-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
      </div>
      <p className="text-gray-500 text-sm font-medium">{message}</p>
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      >
        {inner}
      </motion.div>
    )
  }

  return (
    <div className="flex items-center justify-center py-20">
      {inner}
    </div>
  )
}
