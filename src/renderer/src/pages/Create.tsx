import { useQueryClient, useMutation } from '@tanstack/react-query'
import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface DataMutation {
  name: string
  email: string
  phone: string
  address: string
  role: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Create() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)

  const { isPending, mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: DataMutation) => {
      const response = await window.api
        .addCustomer({
          name: data.name,
          email: data.email,
          role: data.role,
          status: true,
          phone: data.phone,
          address: data.address
        })
        .then((response) => {
          navigate('/')
        })
        .catch((err) => console.log('Erro ao cadastrar', err))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })

  async function handleAddCustomer(e: FormEvent) {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const address = addressRef.current?.value
    const role = roleRef.current?.value
    const phone = phoneRef.current?.value

    if (!name || !address || !email || !phone || !role) {
      return
    }

    await createCustomer({
      name,
      email,
      role,
      phone,
      address
    })
  }

  return (
    <div className="flex-1 flex-col py-12 px-10 gap-8 overflow-y-auto">
      <section className="flex flex-1 flex-col items-center">
        <h1 className="text-white text-xl lg:text-3xl font-semibold">Cadastrar Novo Cliente</h1>

        <form action="" className="w-full max-w-96 mt-4" onSubmit={handleAddCustomer}>
          <div className="mb-2">
            <label className="text-lg">Nome:</label>
            <input
              type="text"
              placeholder="Digite o nome do cliente..."
              className="w-full h-9 text-black px-2"
              ref={nameRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg">Endereço:</label>
            <input
              type="text"
              placeholder="Digite o seu endereço..."
              className="w-full h-9 text-black px-2"
              ref={addressRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg">Email:</label>
            <input
              type="email"
              placeholder="Digite o seu email..."
              className="w-full h-9 text-black px-2"
              ref={emailRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg">Cargo:</label>
            <input
              type="text"
              placeholder="Digite o seu cargo..."
              className="w-full h-9 text-black px-2"
              ref={roleRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg">Telefone:</label>
            <input
              type="text"
              placeholder="Digite o seu telefone..."
              className="w-full h-9 text-black px-2"
              ref={phoneRef}
            />
          </div>

          <button
            className="bg-blue-500 flex items-center justify-center w-full h-9 disabled:bg-gray-500"
            type="submit"
            disabled={isPending}
          >
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  )
}

export default Create
