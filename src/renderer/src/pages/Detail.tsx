import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { ArrowUpLeft, Trash } from 'phosphor-react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  //buscar os clientes
  const { data, isFetching } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await window.api.fetchCustomerById(id!)
      return response
    }
  })

  const { isPending, mutateAsync: handleDeleteCustomer } = useMutation({
    mutationFn: async (id: string) => {
      try {
        window.api.deleteCustomer(id)
      } catch (err) {
        console.log('Erro ao deletar o cliente', err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      navigate('/')
    }
  })

  return (
    <main className="flex flex-1 flex-col py-12 text-white px-10">
      <Link to="/" className="flex items-center gap-2 mb-2">
        <ArrowUpLeft className="w-6 h-6 text-white" />
        <span>Voltar</span>
      </Link>
      <h1 className="text-white text-xl lg:text-3xl font-semibold mb-4">Detalhes do cliente</h1>
      <section className="flex flex-col gap-6 w-full">
        {!isFetching && !!data && (
          <article className="w-full relative flex flex-col gap-1">
            <section className="bg-gray-800 rounded px-4 py-3">
              <p className="mb-2 font-semibold text-lg">{data.name}</p>
              <p>
                <span className="font-semibold">E-mail: </span>
                {data.email}
              </p>

              {data.address && (
                <p>
                  <span className="font-semibold">Endereço: </span>
                  {data.address}
                </p>
              )}

              {data.phone && (
                <p>
                  <span className="font-semibold">Telefone: </span>
                  {data.phone}
                </p>
              )}
            </section>

            <div className="absolute -top-3 right-2">
              <button
                onClick={() => {
                  handleDeleteCustomer(data._id)
                }}
                className="bg-red-500 hover:bg-red-600 p-2 rounded-full z-20"
                disabled={isPending}
              >
                <Trash className="text-white h-6 w-6" />
              </button>
            </div>

            <section className="bg-gray-800 rounded px-4 py-3">
              <p>
                <span>Cargo: </span> {data.role}
              </p>
              <p>
                <span>Status atual: </span> {data.status ? 'Ativo' : 'Inativo'}
              </p>
            </section>
          </article>
        )}
      </section>
    </main>
  )
}

export default Detail
