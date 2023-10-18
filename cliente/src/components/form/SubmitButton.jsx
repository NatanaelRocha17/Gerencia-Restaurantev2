import styles from './SubmitButton.module.css'

function SubmitButton({ text, tipo }) {
  return (
    <div>
      <button className={styles.btn} type={tipo}>{text}</button>
    </div>
  )
}

export default SubmitButton