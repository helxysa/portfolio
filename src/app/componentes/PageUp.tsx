'use client'

import { useEffect, useState } from 'react'
import styles from './PageUp.module.css'
import { IoIosArrowUp } from 'react-icons/io'
import Image from 'next/image'

const PageUp = () => {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [isRocket, setIsRocket] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsLaunching(false)
        setIsRocket(false)
      }
    }

    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [mounted])

  const scrollToTop = () => {
    if (!mounted) return

    setIsRocket(true)
    
    setTimeout(() => {
      setIsLaunching(true)
      
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }, 100)

      setTimeout(() => {
        setIsLaunching(false)
        setIsRocket(false)
      }, 2000)
    }, 300)
  }

  if (!mounted) return null

  return (
    <div className={styles.wrapper}>
      {isVisible && (
        <button
          className={`${styles.pageUp} ${isLaunching ? styles.launch : ''} ${isRocket ? styles.rocketMode : ''}`}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        >
          {isRocket ? (
            <Image 
              src="/images/spaceship.png"
              alt="Foguete"
              width={100}
              height={100}
              className={styles.rocket}
              priority
            />
          ) : (
            <IoIosArrowUp className={styles.arrow} />
          )}
          <div className={styles.fire}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      )}
    </div>
  )
}

export default PageUp
