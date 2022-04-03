import { useContext } from 'react'
import { ImGoogle } from 'react-icons/im'
import { RiWifiOffLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { SfxContext } from '../../contexts/SfxContext'
import { useAnimation } from '../../hooks/useAnimation'
import { useAuth } from '../../hooks/useAuth'

import { buttonsVariants, textVariants } from './HomeNotLoggedAnimation'
import { Container, Title, Description, BoxButton } from './HomeNotLoggedStyle'

export function HomeNotLogged() {
  const { user, signInWithGoogle } = useAuth()
  const { tickSfx, clickSfx } = useContext(SfxContext)
  const navigate = useNavigate()

  const [textAnimation, setTextAnimation] = useAnimation(300)
  const [buttonAnimation, setButtonAnimation] = useAnimation(300)

  function handlePlayOffline() {
    clickSfx()

    setTextAnimation('initial')
    setButtonAnimation('initial')

    setTimeout(() => {
      navigate('/lobby')
    }, 900)
  }

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/home')
  }

  return (
    <Container>
      <Title initial="initial" variants={textVariants} animate={textAnimation}>
        Dots Game
      </Title>
      <Description
        initial="initial"
        variants={textVariants}
        animate={textAnimation}
      >
        Play with your friends and try to get the highest score.
      </Description>

      <BoxButton
        initial="initial"
        variants={buttonsVariants}
        animate={buttonAnimation}
      >
        <Button
          color="black"
          onClick={handlePlayOffline}
          onMouseEnter={() => tickSfx()}
          id="offline-game-button"
        >
          <RiWifiOffLine size={20} style={{ marginRight: '10px' }} />
          Play Offline
        </Button>
        <Button
          color="red"
          onMouseEnter={() => tickSfx()}
          onClick={handleLogin}
        >
          <ImGoogle size={20} style={{ marginRight: '10px' }} />
          Play Online
        </Button>
      </BoxButton>
    </Container>
  )
}
