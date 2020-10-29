import styles from './Home.module.css'
import GoogleButton from 'react-google-button'
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  return (
    <div className={styles.Main}>
      <div className={styles.Top}>
        <h1 className={styles.TopText}>Let’s Get<br />Started</h1>
      </div>
      <div className={styles.Bottom}>
        <div className={styles.BottomSpacer}></div>
        <GoogleButton
          className={styles.GoogleButton}
          onClick={() => { history.push('/current') }}
        />
        <div className={styles.BottomMidSpacer}></div>
        <div className={styles.SubBottom}>
          <div className={styles.BottomButtonSpacer}></div>
          <button type="button" className={styles.LoginButton} onClick={() => { history.push('/current') }}>LOG IN</button>
          <div className={styles.BottomMidButtonSpacer}></div>
          <button type="button" className={styles.CreateButton} onClick={() => { history.push('/current') }}>CREATE</button>
          <div className={styles.BottomButtonSpacer}></div>
        </div>
        <div className={styles.BottomSpacer}></div>
      </div >
    </div >
  );
}
