import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  return (
    <div id="ts" role="status" className={toast.show ? 'o' : ''}>
      {toast.text}
    </div>
  );
}
