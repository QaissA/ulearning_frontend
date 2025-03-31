import { Grades, columns } from './columns'
import { DataTable } from '@/components/data-table'

async function getGrades(): Promise<Grades[]> {
    const res = await fetch(
        'http://localhost:3000/api/notes'
    );
    const data = await res.json()
    return data
}

export default async function GradesPage() {
    const grades = await getGrades();

    return (
        <section className='py-24'>
            <div className='container'>
                <h1 className='mb-6 text-3xl font-bold'>Grades</h1>
                <DataTable columns={columns} data={grades} />
            </div>
        </section>
    );
}