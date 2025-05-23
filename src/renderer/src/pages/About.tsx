import { useQuery } from '@tanstack/react-query'

export function About() {
  const { data } = useQuery({
    queryKey: ['get-version'],
    queryFn: async () => {
      const response = await window.api.getVersionApp()
      return response
    }
  })
  return (
    <div className="flex-1 flex flex-col py-12 text-white px-10">
      <h1 className="text-white text-xl lg:text-3xl mb-4">Página Sobre</h1>
      <p>
        Projeto criado no curso <strong className="font-semibold">@SujeitoProgramador</strong>
      </p>
      <p>Versão atual do projeto: {data}</p>
    </div>
  )
}

export default About
