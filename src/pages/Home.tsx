import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import AnimatedBackground from '../components/AnimatedBackground'

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Hero />
      <Stats />
      <Features />
    </>
  )
}