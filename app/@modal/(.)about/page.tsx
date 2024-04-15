/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Modal } from '../(.)photos/[id]/modal'
export default async function AboutModal({}: {}) {
  return (
    <Modal>
      <div>
        <h1>About</h1>
        <p>Some information about the app</p>
        <p>Im a modal</p>
      </div>
    </Modal>
  )
}
