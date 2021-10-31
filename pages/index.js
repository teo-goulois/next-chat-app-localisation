import Header from '../components/header'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Location from '../components/location'
export default function Home() {
  return (
    <div className={styles.container}>
      <Location />
      </div>
  )
}
