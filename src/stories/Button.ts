import './button.css'

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const createButton = ({
  primary = false,
  size = 'md',
  backgroundColor,
  label,
  onClick,
}: ButtonProps) => {
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.innerText = label
  if (onClick) {
    btn.addEventListener('click', onClick)
  }

  const mode = primary ? 'btn-primary' : 'btn-secondary'
  btn.className = ['btn', `btn-${size}`, mode].join(' ')

  if (backgroundColor) {
    btn.style.backgroundColor = backgroundColor
  }

  return btn
}
