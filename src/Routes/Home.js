import styles from './Home.module.css'
import GoogleButton from 'react-google-button'

export default function Main() {
  return (
    <div className={styles.App}>
      <div className={styles.Top}>
        <h1 className={styles.TopText}>Let’s Get<br />Started</h1>
      </div>
      <div className={styles.Bottom}>
        <div className={styles.BottomSpacer}></div>
        <GoogleButton
          className={styles.GoogleButton}
          onClick={() => { console.log('Google button clicked') }}
        />
        <div className={styles.BottomMidSpacer}></div>
        <div className={styles.SubBottom}>
          <div className={styles.BottomButtonSpacer}></div>
          <button type="button" className={styles.LoginButton}>LOG IN</button>
          <div className={styles.BottomMidButtonSpacer}></div>
          <button type="button" className={styles.CreateButton}>CREATE</button>
          <div className={styles.BottomButtonSpacer}></div>
        </div>
        <div className={styles.BottomSpacer}></div>
      </div >
    </div >
  );
}
