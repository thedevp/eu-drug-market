
"use client"
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()
const CSVDataTable = dynamic(() => import('@/components/CSVDataTable'), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QueryClientProvider client={queryClient}>
        <CSVDataTable />
      </QueryClientProvider>
    </main>
  );
}