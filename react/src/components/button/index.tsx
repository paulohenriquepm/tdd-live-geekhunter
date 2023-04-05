import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  emoji?: boolean
}

const Button = ({ loading, emoji, children, ...props }: ButtonProps) => {
  return (
    <div>
      <button {...props}>{loading ? 'Loading...' : children}</button>
      {emoji ? '😁' : null}
    </div>
  )
}

export { Button }
