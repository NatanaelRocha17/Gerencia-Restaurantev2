import styles from './Input.module.css'

function Input({ type, text, name, placeholder, onChange, value, step, requerido, maxLength}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        step={step}
        id={name}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={requerido}
      />
    </div>
  );
}


export default Input
