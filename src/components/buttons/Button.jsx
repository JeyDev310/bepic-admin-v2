import { Button as Button_ } from 'antd';
import styles from './Button.less';

export function Button({ ...props }) {
  return (
    <Button_
      type="primary"
      className={`${styles.container} ${props.success ? 'ant-btn-success' : ''}`}
      {...props}
    />
  );
}
