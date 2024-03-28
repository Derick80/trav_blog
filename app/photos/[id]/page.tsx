import { getImageById } from '@/app/actions'

export default async function PhotoPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const image = await getImageById(id);
  if (!image) {
    return <div>Not found</div>;
  }
  return <div className='card'>{id}</div>
}
