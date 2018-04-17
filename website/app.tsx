import * as React from 'react'
import * as ReactDOM from 'react-dom'

// @ts-ignore
import copy from 'copy-to-clipboard'
import styled, {keyframes} from 'styled-components'
import posed from 'react-pose'

import {material, octicons} from '../..'

type IconType = typeof material.AccessAlarm

const Header = styled.h1`
  font-weight: 600;
  font-size: 1.7rem;
`

const PackHeader = styled.h2`
  font-weight: 500;
  font-size: 1.1rem;
`

const InstallCode = styled.code`
  display: inline-block;
  background: rgba(0, 0, 0, 0.2);
  white-space: pre;
  padding: 12px;
  color: #000;
`

const CodeExample = styled.code`
  display: inline-block;
  background: rgba(0, 0, 0, 0.2);
  white-space: pre;
  padding: 12px;
  text-align: left;
  margin-top: 1em;
  color: #000;
`

interface IconDemoProps {
  Icon: IconType
  name: string
  originalName: string
  pack: string
}

interface IconDemoState {
  copied: boolean
  hovering: boolean
}

const AnimatedBox = posed.div({
  idle: {
    scale: 1,
  },
  hovered: {
    scale: 1.05,
  },
})

const IconDemoContainer = styled(AnimatedBox)`
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  color: #000;
  will-change: transform;
`

const IconCode = styled.code`
  white-space: pre;
  overflow-x: scroll;
  display: block;
  padding: 12px;
  width: 100%;
`

const IconName = styled.strong`
  font-weight: 500;
`

class IconDemo extends React.Component<IconDemoProps, IconDemoState> {
  mounted = false
  state = {copied: false, hovering: false}

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  get iconImport() {
    return `styled-icons/${this.props.pack}/${this.props.name}`
  }

  copy = () => {
    copy(this.iconImport)
    this.setState({copied: true})

    setTimeout(() => {
      if (this.mounted) {
        this.setState({copied: false})
      }
    }, 2000)
  }

  render() {
    const {Icon, originalName} = this.props
    return (
      <IconDemoContainer
        onClick={() => this.copy()}
        pose={this.state.hovering ? 'hovered' : 'idle'}
        onMouseEnter={() => this.setState({hovering: true})}
        onMouseLeave={() => this.setState({hovering: false})}
      >
        <div>
          <Icon height="48" width="48" />
        </div>
        <IconName>{originalName}</IconName>
        <IconCode>{this.state.copied ? 'Copied!' : this.iconImport}</IconCode>
      </IconDemoContainer>
    )
  }
}

const renderMaterialIcons = () =>
  Object.keys(material).map(icon => {
    // @ts-ignore
    const Icon = material[icon] as IconType

    return <IconDemo Icon={Icon} name={icon} originalName={icon} pack="material" key={icon} />
  })

const renderOcticonsIcons = () =>
  Object.keys(octicons).map(icon => {
    // @ts-ignore
    const Icon = octicons[icon] as IconType

    return <IconDemo Icon={Icon} name={icon} originalName={icon} pack="octicons" key={icon} />
  })

const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, max-content));
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`

const A = styled.a`
  color: #fff;
`

const OctocatWave = keyframes`
0%, 100%{
  transform: rotate(0);
}

20%, 60% {
  transform:rotate(-25deg);
}

40%, 80% {
  transform:rotate(10deg);
}
`

const GitHubCornerSVG = styled.svg`
  fill: #151513;
  color: #fff;
  position: absolute;
  top: 0;
  border: 0;
  right: 0;
`

const GitHubCornerArm = styled.path`
  transform-origin: 130px 106px;

  ${GitHubCornerSVG}:hover & {
    animation: ${OctocatWave} 560ms ease-in-out;
  }

  @media (max-width: 500px) {
    ${GitHubCornerSVG}:hover & {
      animation: none;
    }
    ${GitHubCornerSVG} & {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
`

const GitHubCornerBody = styled.path``

const GitHubCorner = () => (
  <a href="https://github.com/jacobwgillespie/styled-icons" aria-label="View source on Github">
    <GitHubCornerSVG width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
      <GitHubCornerArm
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor"
        className="octo-arm"
      />
      <GitHubCornerBody
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor"
        className="octo-body"
      />
    </GitHubCornerSVG>
  </a>
)

const App = () => (
  <>
    <GitHubCorner />
    <Header>Styled Icons 💅</Header>
    <p>
      Import icons from the <A href="https://material.io/icons/">Material</A> or{' '}
      <A href="https://octicons.github.com/">Octicons</A> icon packs as{' '}
      <A href="https://www.styled-components.com/">Styled Components</A>
    </p>

    <InstallCode>yarn install styled-icons</InstallCode>
    <div>
      <CodeExample>
        {`
import {Alarm} from 'styled-icons/material/Alarm'

const App = () => <Alarm />
    `.trim()}
      </CodeExample>
    </div>
    <PackHeader>Material Icons</PackHeader>
    <IconsContainer>{renderMaterialIcons()}</IconsContainer>
    <PackHeader>Octicons</PackHeader>
    <IconsContainer>{renderOcticonsIcons()}</IconsContainer>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))