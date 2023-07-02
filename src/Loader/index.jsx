import styled, { keyframes } from 'styled-components'

const LoaderContainer = styled.div`
  position: absolute;
  top: -25px;
  text-align: center;
  height: 100%;
  &:before {
    display: inline-block;
    vertical-align: middle;
    content: ' ';
    height: 100%;
  }
`

const Loader = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  & svg {
    width: 100%;
    height: 100%;
  }
`

const slowdash = keyframes`
    0%,
    100% {
      stroke-dasharray: 100, 2500;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 200, 2500;
      stroke-dashoffset: -100;
    }
`

const rotate = keyframes`
    0% {
      transform: rotate(-45deg);
    }
    50% {
      transform: rotate(135deg);
    }
    100% {
      transform: rotate(315deg);
    }
`

const fastdash = keyframes`
  0% {
      stroke-dasharray: 1, 2500;
    }
    25% {
      stroke-dasharray: 1900, 2500;
      stroke-dashoffset: -100;
    }
    75% {
      stroke-dasharray: 2100, 2500;
      stroke-dashoffset: -400;
    }
    100% {
      stroke-dasharray: 2500, 2500;
      stroke-dashoffset: -2500;
    }
  `

const hexa = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }
    15%,
    50% {
      transform: scale(0.5);
      opacity: 0;
    }
    65% {
      transform: scale(1);
      opacity: 1;
    }
`

const Hexas = styled.g`
  path {
    fill: black;
  }

  & path:nth-child(1) {
    animation: ${hexa} 3s 0s infinite;
    transform-origin: 50% 50%;
  }
  & path:nth-child(2) {
    animation: ${hexa} 3s 0.21429s infinite;
    transform-origin: 50% 50%;
  }
  & path:nth-child(3) {
    animation: ${hexa} 3s 0.42857s infinite;
    transform-origin: 50% 50%;
  }
  & path:nth-child(4) {
    animation: ${hexa} 3s 0.64286s infinite;
    transform-origin: 50% 50%;
  }
  & path:nth-child(5) {
    animation: ${hexa} 3s 0.85714s infinite;
    transform-origin: 50% 50%;
  }
  & path:nth-child(6) {
    animation: ${hexa} 3s 1.07143s infinite;
    transform-origin: 50% 50%;
  }
  & path:nth-child(7) {
    animation: ${hexa} 3s 1.28571s infinite;
    transform-origin: 50% 50%;
  }
`

const BG = styled.circle`
  stroke: #e3e4dc;
`

const SLOW = styled.circle`
  stroke: #98938f;
  animation: ${slowdash} 3s linear infinite, ${rotate} 3s linear infinite;
  transform-origin: 50% 50%;
`

const FAST = styled.circle`
  stroke: black;
  animation: ${fastdash} 3s linear infinite, ${rotate} 3s linear infinite;
  transform-origin: 50% 50%;
`

function Load({ width, height }) {
  return (
    <LoaderContainer>
      <Loader width={width} height={height}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="850"
          height="850"
          viewBox="0 0 850 850"
        >
          <g>
            <BG
              fill="none"
              stroke-width="10"
              stroke-miterlimit="10"
              cx="425"
              cy="425"
              r="400"
            />

            <FAST
              fill="none"
              stroke="#fff"
              stroke-width="10"
              stroke-miterlimit="10"
              cx="425"
              cy="425"
              r="400"
            />

            <SLOW
              fill="none"
              stroke-width="10"
              stroke-miterlimit="10"
              cx="425"
              cy="425"
              r="400"
            />
          </g>
          <Hexas>
            <path d="M334.145 358.92c-2.7 1.56-7.12 1.56-9.82 0l-77.152-44.545c-2.7-1.56-4.91-5.386-4.91-8.504v-89.086c0-3.118 2.21-6.945 4.91-8.504l77.154-44.545c2.7-1.56 7.12-1.56 9.82 0l77.152 44.544c2.7 1.558 4.91 5.385 4.91 8.503v89.09c0 3.117-2.21 6.944-4.91 8.503l-77.155 44.544z" />

            <path d="M521.262 359.014c-2.7 1.56-7.12 1.56-9.82 0L434.29 314.47c-2.7-1.56-4.91-5.387-4.91-8.505v-89.087c0-3.118 2.208-6.945 4.91-8.504l77.153-44.545c2.7-1.56 7.12-1.56 9.82 0l77.152 44.542c2.7 1.56 4.91 5.386 4.91 8.504v89.09c0 3.117-2.21 6.944-4.91 8.503l-77.153 44.544z" />

            <path d="M614.9 521.2c-2.7 1.56-7.118 1.56-9.818 0l-77.153-44.543c-2.7-1.56-4.91-5.386-4.91-8.504v-89.088c0-3.118 2.208-6.945 4.91-8.504l77.153-44.544c2.7-1.56 7.12-1.56 9.82 0l77.15 44.544c2.7 1.56 4.91 5.386 4.91 8.504v89.09c0 3.117-2.208 6.943-4.91 8.503L614.902 521.2z" />

            <path d="M521.424 683.294c-2.7 1.56-7.12 1.56-9.82 0l-77.153-44.545c-2.7-1.56-4.91-5.387-4.91-8.505v-89.088c0-3.118 2.21-6.944 4.91-8.504l77.156-44.543c2.7-1.56 7.12-1.56 9.82 0l77.15 44.543c2.7 1.56 4.91 5.386 4.91 8.504v89.09c0 3.118-2.208 6.944-4.91 8.504l-77.152 44.544z" />

            <path d="M333.73 683.534c-2.7 1.56-7.118 1.56-9.818 0L246.76 638.99c-2.7-1.56-4.91-5.385-4.91-8.503v-89.09c0-3.118 2.21-6.944 4.91-8.504l77.153-44.543c2.7-1.56 7.12-1.56 9.82 0l77.152 44.543c2.7 1.56 4.91 5.386 4.91 8.504v89.088c0 3.118-2.21 6.944-4.91 8.504l-77.154 44.544z" />

            <path d="M240.09 521.345c-2.7 1.56-7.118 1.56-9.818 0l-77.153-44.543c-2.7-1.56-4.91-5.386-4.91-8.504V379.21c0-3.118 2.21-6.945 4.91-8.504l77.153-44.545c2.7-1.558 7.12-1.558 9.82 0l77.152 44.545c2.7 1.56 4.91 5.386 4.91 8.504v89.088c0 3.118-2.21 6.944-4.91 8.504l-77.154 44.543z" />

            <path d="M427.785 521.106c-2.7 1.56-7.12 1.56-9.82 0l-77.152-44.545c-2.7-1.56-4.91-5.385-4.91-8.503V378.97c0-3.118 2.21-6.945 4.91-8.504l77.153-44.545c2.7-1.558 7.12-1.558 9.82 0l77.153 44.545c2.7 1.56 4.91 5.386 4.91 8.504v89.087c0 3.118-2.21 6.944-4.91 8.504l-77.155 44.546z" />
          </Hexas>
        </svg>
      </Loader>
    </LoaderContainer>
  )
}

export default Load
