import styles from '../../styles/components/NavFooter.module.scss';

const NavFooter = () => {
  return (
    <div className={styles.navFooter}>
        <a>Awwwards</a>
        <a>Instagram</a>
        <a>Dribble</a>
        <a>LinkedIn</a>
    </div>
  )
}

export default NavFooter;