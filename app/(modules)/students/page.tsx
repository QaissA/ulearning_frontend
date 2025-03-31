import { Students, columns } from './columns'
import { DataTable } from '@/components/data-table'

async function getStudents(): Promise<Students[]> {
    const res = await fetch(
        'http://localhost:3000/api/users/role/STUDENT'
    )
    const data = await res.json()
    return data
    }

    export default async function Page() {
        const data = await getStudents()

        return (
            <section className='py-24'>
                <div className='container'>
                    <h1 className='mb-6 text-3xl font-bold' >Students</h1>
                    <DataTable columns={columns} data={data} />
                </div>
            </section>
        )
}