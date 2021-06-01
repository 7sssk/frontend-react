import { useForm } from 'react-hook-form'

export const Form = () => {
  const {} = useForm({ defaultValues: {} })

  return (
    <form>
      <input type="text" name="location" />
    </form>
  )
}
