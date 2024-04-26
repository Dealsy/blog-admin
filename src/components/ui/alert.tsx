type AlertProps = {
  submitType: boolean
  text: string
}

export default function Alert({ submitType, text }: AlertProps) {
  const alertStyles = `rounded-md p-4 text-sm ${
    submitType ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }`

  return (
    <div role="alert" className={alertStyles}>
      {text}
    </div>
  )
}
