import styled from 'styled-components'
import { COLORS } from '../common/modern-theme'

const CommonAlphabetStyling = styled.div`
  position: absolute;
  /* font-weight: bold; */
  font-size: 1.2em;
  color: ${COLORS.PADDINGFOREGROUND};
  text-transform: uppercase;
  display: flex;
`

const LeftRender = styled(CommonAlphabetStyling)`
  height: 100%;
  left: -40px;
  align-items: center;
`

const BottomRender = styled(CommonAlphabetStyling)`
  width: 100%;
  bottom: -40px;
  justify-content: center;
`

/**
 * Annotation component, draws the numbers on the left side of the board,
 * and alphabets on the bottom of the board, depending on the align property.
 * The square property has the square notation (Eg: a8), where the 'a' goes to
 * the bottom and '8' goes on the left side.
 *
 * @param {*} { square, align }
 * @returns
 */
function Annotation({ square, align }) {
  const splitChars = square.split('')
  const charToDisplay =
    align === 'left' ? (
      <LeftRender>{splitChars[1]}</LeftRender>
    ) : (
      <BottomRender>{splitChars[0]}</BottomRender>
    )
  return <div>{charToDisplay}</div>
}

export default Annotation
