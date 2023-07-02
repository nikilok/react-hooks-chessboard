import styled from 'styled-components'

const Caption = styled.div`
  font-size: 1.5em;
  margin-bottom: 15px;
`

const PromotionMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`

const PromotionModal = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 10px;
`

/**
 * Modal Component helps with rendering a modal view on to the app.
 * It renders a title and whatever children is sent into it.
 *
 * @param {*} { title, children }
 * @returns
 */
function Modal({ title, children }) {
  return (
    <PromotionMask>
      <PromotionModal>
        <Caption>{title}</Caption>
        {children}
      </PromotionModal>
    </PromotionMask>
  )
}

export default Modal
