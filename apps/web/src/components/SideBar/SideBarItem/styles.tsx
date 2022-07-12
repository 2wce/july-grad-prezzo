import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { color, get } from 'styled-system'
import { theme } from '../../../theme'

const MotionLink = motion<NavLinkProps>(NavLink)

type MenuItemProps = {
  color?: string
  bg?: string
  accentcolor?: string
  hovercolor?: string
}

const { colors } = theme

export const Tooltip = styled(Flex)`
  opacity: 0;
  left: 70px;
  border-radius: 5px;
  visibility: hidden;
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translateX(10px);
  &:after {
    top: 50%;
    width: 0;
    margin: 0;
    height: 0;
    left: -5px;
    content: '';
    line-height: 0;
    position: absolute;
    transform: translateY(-50%);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid ${theme.colors.gray[800]};
  }
`

export const MenuItem = styled(MotionLink)<MenuItemProps>`
  height: 50px;
  display: flex;
  position: relative;
  align-self: stretch;
  align-items: center;
  white-space: nowrap;
  background: transparent;
  justify-content: flex-start;
  transition: background 0.2s ease;
  &.active-nav-link::before {
    ${color};
    top: 0;
    left: 0;
    bottom: 0;
    width: 5px;
    content: '';
    position: absolute;
  }
  & .icon-wrap svg {
    stroke: ${(props) => get(colors, props.color || '', props.color || 'white')};
  }
  &:hover {
    cursor: pointer;
    transition: background 0.2s ease;
    background: ${(props) => get(colors, props.hovercolor || '', props.hovercolor || 'pink')};
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover .sidebar-tooltip {
    opacity: 1;
    width: auto;
    padding: 5px 10px;
    visibility: visible;
    transform: translateX(0);
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`
