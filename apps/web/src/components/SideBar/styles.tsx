import styled from '@emotion/styled'
import MotionFlex from '../MotionFlex'

export const RenderWrapper = styled(MotionFlex)`
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
  flex-direction: column;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`

export const MenuCont = styled(MotionFlex)<{ iconOffset?: number }>`
  flex: 0 0 200px;
  position: fixed;
  max-width: 100%;
  min-height: 100vh;
  width: 250px;
  z-index: 1299;
  & .sidebar-menu-icon {
    font-size: 21px;
    margin-left: ${(props) => `${props.iconOffset || 0}px`};
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  & .nav-link-text-hidden > div > span {
    opacity: 0;
    visibility: hidden;
    width: 0;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`

export const Overlay = styled(MotionFlex)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1295;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
`
