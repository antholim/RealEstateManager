import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import "./Modal.css"

const ModalPortal = forwardRef(function Modal({ title, actions, content }, ref) {
  const dialog = useRef(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current?.showModal()
    },
    close: () => {
      dialog.current?.close()
    },
  }))

  return createPortal(
    <dialog id="modal" ref={dialog} className="modal">
      <h2 className="modal-title">{title}</h2>
      <div className="modal-content">{content}</div>
      {actions && <div className="modal-actions">{actions}</div>}
    </dialog>,
    document.body,
  )
})

export default ModalPortal;
