import styles from '@/styles/spinner.module.css'

export default function Spinner () {
    
    return (
        <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}