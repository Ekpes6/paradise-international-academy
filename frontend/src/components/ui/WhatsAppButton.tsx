import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '+2348000000000'
const MESSAGE = encodeURIComponent(
  "Hello! I'd like to know more about Paradise International Academy. Could you please assist me?"
)

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="whatsapp-float"
    >
      <MessageCircle size={28} fill="white" />
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-60" />
    </motion.a>
  )
}
