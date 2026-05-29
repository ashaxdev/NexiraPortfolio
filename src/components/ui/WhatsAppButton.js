'use client'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919384155672'
  const msg = encodeURIComponent('Hi Nexira Solution! I\'d like to know more about your services.')
  const href = `https://wa.me/${phone}?text=${msg}`

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp" title="Chat with us on WhatsApp">
      <FaWhatsapp />
    </a>
  )
}
